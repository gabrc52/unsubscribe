import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import UserInterface from "../shared/User";
import { GOOGLE_CLIENT_ID } from "../shared/constants";
import User from "./models/User";
import { Issuer, UserinfoResponse } from "openid-client";
import { StatusCodes } from "http-status-codes";

type LoginType = "google" | "touchstone";

/* Touchstone (OIDC - OpenID Connect) */

const BASEURL = process.env.BASEURL ?? "http://localhost:5050";

const OIDC_REDIRECT_URI = `${BASEURL}/api/login/touchstone`;

const touchstoneIssuerPromise = Issuer.discover("https://petrock.mit.edu");
let oidcClientPromise = touchstoneIssuerPromise.then(
  (issuer) =>
    new issuer.Client({
      client_id: process.env.AUTH_CLIENT_ID!,
      client_secret: process.env.AUTH_CLIENT_SECRET!,
      redirect_uris: [OIDC_REDIRECT_URI],
      response_types: ["code"],
    })
);

export const redirectOidc = (req: Request, res: Response) => {
  oidcClientPromise
    .then((client) => {
      // https://www.npmjs.com/package/openid-client has a code challenge, is it necessary?
      const url = client.authorizationUrl({ scope: "openid profile email" });
      res.redirect(url);
    })
    .catch((e) => res.send(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${e}` }));
};

const getUserInfo = async (req: Request): Promise<UserinfoResponse> => {
  const client = await oidcClientPromise;
  const params = client.callbackParams(req);
  const tokenSet = await client.callback(OIDC_REDIRECT_URI, params);
  const userinfo = await client.userinfo(tokenSet.access_token!);
  return userinfo;
};

// basically a copy paste of loginGoogle
export const loginTouchstone = (req: Request, res: Response) => {
  getUserInfo(req)
    .then((user) => {
      if (user === undefined) return;
      return getOrCreateUser("touchstone", user);
    })
    .then((user) => {
      if (user === null || user === undefined) {
        throw new Error("Unable to retrieve user.");
      }
      req.session.user = user;
      res.redirect("/");
    })
    .catch((err) => {
      console.log(`Failed to login: ${err}`);
      res.status(401).send({ err });
    });
};

/** Google */

// create a new OAuth client used to verify google sign-in
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const verifyGoogle = (token: string) => {
  return googleClient
    .verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
};

/** Common code */

const getOrCreateUser = (
  loginType: LoginType,
  user: { sub: string; name?: string | undefined; picture?: string | undefined }
) => {
  return User.findOne({ userId: user.sub }).then(
    (existingUser: UserInterface | null | undefined) => {
      if (existingUser !== null && existingUser !== undefined) {
        // return existingUser;
        if (user.name !== undefined) {
          existingUser!.name = user.name;
        }
        // console.log(`what!`);
        // console.log(user.name, user.sub, user.picture);
        // console.log(`what!`);
        if (user.picture !== undefined) {
          existingUser!.picture = user.picture;
        }
        return existingUser!.save();
      }
      console.log(`Creating new user ${user.name} (${user.sub})`);
      const newUser = new User({
        name: user.name,
        picture: user.picture,
        userId: user.sub,
        loginType: loginType,
      });
      return newUser.save();
    }
  );
};

export const loginGoogle = (req: Request, res: Response) => {
  verifyGoogle(req.body.token)
    .then((user) => {
      if (user === undefined) return;
      return getOrCreateUser("google", user);
    })
    .then((user) => {
      if (user === null || user === undefined) {
        throw new Error("Unable to retrieve user.");
      }
      req.session.user = user;
      res.send(user);
    })
    .catch((err) => {
      console.log(`Failed to login: ${err}`);
      res.status(401).send({ err });
    });
};

export const logout = (req: Request, res: Response) => {
  req.session.user = undefined;
  res.send({});
};

export const populateCurrentUser = (req: Request, _res: Response, next: NextFunction) => {
  req.user = req.session.user;
  next();
};

export const ensureLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send({ err: "Not logged in." });
  }
  next();
};
