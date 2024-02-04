import { CredentialResponse, GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import LocalPizzaRoundedIcon from "@mui/icons-material/LocalPizzaRounded";
import LunchDiningRoundedIcon from "@mui/icons-material/LunchDiningRounded";
import BakeryDiningRoundedIcon from "@mui/icons-material/BakeryDiningRounded";
import IcecreamRoundedIcon from "@mui/icons-material/IcecreamRounded";

// declare module "*.png";
import MITLogo from "../../public/MIT_logo.png";

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
                <img src={MITLogo} alt="MIT Logo" />
                <p>Touchstone</p>
              </span>
            </a>
            {/* <button className="Login-buttonPrompt u-pointer">
              <span className="u-flex u-flex-justifyCenter u-flex-alignCenter Login-buttonContent">
                <GoogleLogin
                  // ux_mode="redirect"
                  type="standard"
                  text="continue_with"
                  size="large"
                  shape="pill"
                  width="341px"
                  onSuccess={handleLogin}
                />
              </span>
            </button> */}
            <h3 className="Login-about">
              Discover free food, share surplus items, and be reunited with your lost
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
        <div className="back-shapes">
          <span
            className="floating icecream"
            style={{
              top: "66.59856996935649%",
              left: "13.020833333333334%",
              animationDelay: "-0.9s",
            }}
          >
            <IcecreamRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating pizza"
            style={{ top: "31.46067415730337%", left: "33.59375%", animationDelay: "-4.8s" }}
          >
            <LocalPizzaRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating cross"
            style={{
              top: "76.50663942798774%",
              left: "38.020833333333336%",
              animationDelay: "-4s",
            }}
          >
            <BakeryDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating burger"
            style={{ top: "21.450459652706844%", left: "14.0625%", animationDelay: "-2.8s" }}
          >
            <LunchDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating burger"
            style={{
              top: "58.12053115423902%",
              left: "56.770833333333336%",
              animationDelay: "-2.15s",
            }}
          >
            <LunchDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating burger"
            style={{
              top: "8.682328907048008%",
              left: "72.70833333333333%",
              animationDelay: "-1.9s",
            }}
          >
            <LunchDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating cross"
            style={{
              top: "31.3585291113381%",
              left: "58.541666666666664%",
              animationDelay: "-0.65s",
            }}
          >
            <BakeryDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating cross"
            style={{
              top: "69.96935648621042%",
              left: "81.45833333333333%",
              animationDelay: "-0.4s",
            }}
          >
            <BakeryDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating icecream"
            style={{ top: "15.117466802860061%", left: "32.34375%", animationDelay: "-4.1s" }}
          >
            <IcecreamRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating icecream"
            style={{
              top: "13.074565883554648%",
              left: "45.989583333333336%",
              animationDelay: "-3.65s",
            }}
          >
            <IcecreamRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating cross"
            style={{
              top: "55.87334014300306%",
              left: "27.135416666666668%",
              animationDelay: "-2.25s",
            }}
          >
            <BakeryDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating cross"
            style={{ top: "49.54034729315628%", left: "53.75%", animationDelay: "-2s" }}
          >
            <BakeryDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating cross"
            style={{
              top: "34.62717058222676%",
              left: "49.635416666666664%",
              animationDelay: "-1.55s",
            }}
          >
            <BakeryDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating cross"
            style={{
              top: "33.19713993871297%",
              left: "86.14583333333333%",
              animationDelay: "-0.95s",
            }}
          >
            <BakeryDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating burger"
            style={{
              top: "28.19203268641471%",
              left: "25.208333333333332%",
              animationDelay: "-4.45s",
            }}
          >
            <LunchDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating icecream"
            style={{
              top: "39.7344228804903%",
              left: "10.833333333333334%",
              animationDelay: "-3.35s",
            }}
          >
            <IcecreamRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating pizza"
            style={{
              top: "77.83452502553627%",
              left: "24.427083333333332%",
              animationDelay: "-2.3s",
            }}
          >
            <LocalPizzaRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating pizza"
            style={{
              top: "2.860061287027579%",
              left: "47.864583333333336%",
              animationDelay: "-1.75s",
            }}
          >
            <LocalPizzaRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating pizza"
            style={{
              top: "71.3993871297242%",
              left: "66.45833333333333%",
              animationDelay: "-1.25s",
            }}
          >
            <LocalPizzaRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating pizza"
            style={{
              top: "31.256384065372828%",
              left: "76.92708333333333%",
              animationDelay: "-0.65s",
            }}
          >
            <LocalPizzaRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating pizza"
            style={{ top: "46.47599591419816%", left: "38.90625%", animationDelay: "-0.35s" }}
          >
            <LocalPizzaRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating cross"
            style={{
              top: "3.4729315628192032%",
              left: "19.635416666666668%",
              animationDelay: "-4.3s",
            }}
          >
            <BakeryDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating cross"
            style={{ top: "3.575076608784474%", left: "6.25%", animationDelay: "-4.05s" }}
          >
            <BakeryDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating cross"
            style={{
              top: "77.3237997957099%",
              left: "4.583333333333333%",
              animationDelay: "-3.75s",
            }}
          >
            <BakeryDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating cross"
            style={{
              top: "0.9193054136874361%",
              left: "71.14583333333333%",
              animationDelay: "-3.3s",
            }}
          >
            <BakeryDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating icecream"
            style={{ top: "23.6976506639428%", left: "63.28125%", animationDelay: "-2.1s" }}
          >
            <IcecreamRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating icecream"
            style={{ top: "81.30745658835546%", left: "45.15625%", animationDelay: "-1.75s" }}
          >
            <IcecreamRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating icecream"
            style={{
              top: "60.9805924412666%",
              left: "42.239583333333336%",
              animationDelay: "-1.45s",
            }}
          >
            <IcecreamRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating burger"
            style={{ top: "29.009193054136876%", left: "93.90625%", animationDelay: "-1.05s" }}
          >
            <LunchDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating burger"
            style={{ top: "52.093973442288046%", left: "68.90625%", animationDelay: "-0.7s" }}
          >
            <LunchDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating burger"
            style={{ top: "81.51174668028601%", left: "83.59375%", animationDelay: "-0.35s" }}
          >
            <LunchDiningRoundedIcon fontSize="large" />
          </span>
          <span
            className="floating burger"
            style={{
              top: "11.542390194075587%",
              left: "91.51041666666667%",
              animationDelay: "-0.1s",
            }}
          >
            <LunchDiningRoundedIcon fontSize="large" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
