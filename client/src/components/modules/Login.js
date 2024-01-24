import React from "react";
import { Link } from "react-router-dom";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from "@react-oauth/google";

import "./Login.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "981540632706-reasvi26mddkv30qenm2b8ka7ejrlqr0.apps.googleusercontent.com";

// type Props = {
//   userId?: string;
//   handleLogin: (credentialResponse: CredentialResponse) => void;
//   handleLogout: () => void;
// };

const Login = (props) => {
  const { handleLogin, handleLogout } = props;
  return (
    // <div tabindex="-1" style="outline: none;">
    <div className="Login">
      <div className="u-hideOverflow u-maxHeight Login-container">
        <div className="u-flexColumn Login-textContainer">
          <div className="u-flex u-flex-justifyCenter u-flex-alignCenter Login-header">
            {/* <img src="" alt="Unsubscribe Logo"> */}
            <h1>Unsubscribe.</h1>
          </div>
          <div className="u-flexColumn u-flex-alignCenter u-flex-justifyCenter u-flex-alignSelfCenter">
            <h2 className="Login-prompt">Sign in to Continue</h2>
            <button className="Login-buttonPrompt u-pointer">
              <span className="u-flex u-flex-justifyCenter u-flex-alignCenter Login-buttonContent">
                {/* <img src="" alt="MIT Logo"> */}
                <p>MIT Touchstone</p>
              </span>
            </button>
            <button className="Login-buttonPrompt u-pointer">
              <span className="u-flex u-flex-justifyCenter u-flex-alignCenter Login-buttonContent">
                <GoogleOAuthProvider>
                  {props.userId ? (
                    <GoogleLogout
                      clientId={GOOGLE_CLIENT_ID}
                      buttonText="Logout"
                      onLogoutSuccess={props.handleLogout}
                      onFailure={(err) => console.log(err)}
                      className="Login-link Login-login"
                    />
                  ) : (
                    <GoogleLogin
                      clientId={GOOGLE_CLIENT_ID}
                      buttonText="Login"
                      onSuccess={props.handleLogin}
                      onFailure={(err) => console.log(err)}
                      className="Login-link Login-login"
                    />
                  )}
                </GoogleOAuthProvider>
              </span>
            </button>
          </div>
        </div>
        <div className="Login-extraInfo">
          <p>
            <b>Credit:</b> Team&nbsp;
            <a href="https://www.youtube.com/watch?v=_mEzEslivoM" target="_blank">
              youtu.be/_mEzEslivoM
            </a>
            <br></br>(name, name, and name) for&nbsp;
            <a href="https://weblab.mit.edu" target="_blank">
              web.lab
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
