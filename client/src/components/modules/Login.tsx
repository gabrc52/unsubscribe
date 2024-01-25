import { CredentialResponse, GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

type Props = {
  userId?: string;
  handleLogin: (credentialResponse: CredentialResponse) => void;
  handleLogout: () => void;
};

const Login = (props: Props) => {
  const { handleLogin, handleLogout } = props;

  return (
    <div className="Login">
      <div className="u-hideOverflow u-maxHeight Login-container">
        <div className="u-flexColumn Login-textContainer">
          <div className="u-flex u-flex-justifyCenter u-flex-alignCenter Login-header">
            {/* <img src="../../public/unsub.png" alt="Unsubscribe Logo" /> */}
            <h1>Unsubscribe.</h1>
          </div>
          <div className="u-flexColumn u-flex-alignCenter u-flex-justifyCenter u-flex-alignSelfCenter">
            <h2 className="Login-prompt">Say goodbye to dormspam clutter...</h2>
            <a className="Login-buttonPrompt u-pointer" href="/api/login/touchstone/redirect">
              <span className="u-flex u-flex-justifyCenter u-flex-alignCenter Login-buttonContent">
                {/* <img src="" alt="MIT Logo"> */}
                <p>MIT Touchstone</p>
              </span>
            </a>
            <button className="Login-buttonPrompt u-pointer">
              <span className="u-flex u-flex-justifyCenter u-flex-alignCenter Login-buttonContent">
                <GoogleLogin
                  // ux_mode="redirect"
                  type="standard"
                  text="continue_with"
                  size="large"
                  shape="pill"
                  width="300px"
                  onSuccess={handleLogin}
                />
              </span>
            </button>
            <h3 className="Login-about">
              Discover free food, share surplus items, and be<br></br> reunited with your lost
              belongings, all in one place!
            </h3>
          </div>
        </div>
        <div className="Login-extraInfo">
          <div className="scroll-container">
            <div className="scroll-text">
              <p>
                <b>Credit:</b>&nbsp; Team&nbsp;
                <a href="https://www.youtube.com/watch?v=_mEzEslivoM" target="_blank">
                  youtu.be/_mEzEslivoM
                </a>
                &nbsp;&nbsp;(Gabriel Rodríguez, Ari Peró, and Anna Kwon) &nbsp;for&nbsp;
                <a href="https://weblab.mit.edu" target="_blank">
                  web.lab
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
