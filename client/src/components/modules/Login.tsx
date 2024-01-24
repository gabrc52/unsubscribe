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

  // Doesn't DIRECTLY return an id_token, not using it rn
  // const login = useGoogleLogin({
  //   onSuccess: handleLogin,
  //   onError: console.warn,
  // });

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
                <GoogleLogin onSuccess={handleLogin} />
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
