import { NextFunction, Request, Response } from "express";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import UserInterface from "../shared/User";
import { GOOGLE_CLIENT_ID } from "../shared/constants";
import User from "./models/User";

// create a new OAuth client used to verify google sign-in
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const verify = (token: string) => {
  return client
    .verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
};

const getOrCreateUser = (user: TokenPayload) => {
  return User.findOne({ googleid: user.sub }).then(
    (existingUser: UserInterface | null | undefined) => {
      if (existingUser !== null && existingUser !== undefined) {
        // return existingUser;
        if (user.name !== undefined) {
          existingUser!.name = user.name;
        }
        existingUser!.save();
      }
      const newUser = new User({
        name: user.name,
        googleid: user.sub,
      });
      return newUser.save();
    }
  );
};

const login = (req: Request, res: Response) => {
  verify(req.body.token)
    .then((user) => {
      if (user === undefined) return;
      return getOrCreateUser(user);
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

const logout = (req: Request, res: Response) => {
  req.session.user = undefined;
  res.send({});
};

const populateCurrentUser = (req: Request, _res: Response, next: NextFunction) => {
  req.user = req.session.user;
  next();
};

// We use any because
const ensureLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send({ err: "Not logged in." });
  }
  next();
};

export default {
  ensureLoggedIn,
  populateCurrentUser,
  login,
  logout,
};
