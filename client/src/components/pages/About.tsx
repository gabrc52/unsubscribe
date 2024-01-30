import React, { useEffect } from "react";
import "./About.css";
import LocalPizzaRoundedIcon from "@mui/icons-material/LocalPizzaRounded";
import LunchDiningRoundedIcon from "@mui/icons-material/LunchDiningRounded";
import BakeryDiningRoundedIcon from "@mui/icons-material/BakeryDiningRounded";
import IcecreamRoundedIcon from "@mui/icons-material/IcecreamRounded";
import gabe from "../../public/gabe_profile.png";
import ari from "../../public/ari_profile.png";
import anna from "../../public/adventure-tim.png";

const About = () => {
  useEffect(() => {
    document.title = "About Page";
  }, []);
  return (
    <div className="About">
      <div className="u-hideOverflow About-container">
        <div className="u-flexColumn About-textContainer">
          <h1>Welcome to <a href="mailto:unsubscribe-admin@mit.edu">Unsubscribe</a>!</h1>
          <div className="u-flex u-flex-justifyCenter u-flex-alignCenter">
            <p>
              Discover a community-driven platform where sharing resources meets a passion for
              sustainability. Our website brings together the power of technology and a commitment
              to reducing waste on campus.
            </p>
          </div>
          <h2>Key Features:</h2>
          <ul>
            <li>
              <strong>Food Posts:</strong> Share and find free food on campus. We've managed
              to achieve a seamless integration of collected mailing list emails into visually appealing
              feed posts. Upload photos, mark items as "gone," and connect with a community committed to
              reducing food waste.
            </li>
            <li>
              <strong>Scheduled Food Page:</strong> Explore a calendar of scheduled free food
              events. Plan and share your own events, fostering a culture of sharing and
              sustainability.
            </li>
            <li>
              <strong>Personalized Experience:</strong> We ensure the safety of our campus community
              by (post-competition) requiring MIT Touchstone authentication to sign up. This also allows
              us to provide personalized features. Manage your own posts, stay updated on events, and
              contribute to a campus-wide effort towards sustainability!
            </li>
            <li>
            <strong>Avoiding Deadnaming and Dynamic User Data:</strong> We put a great deal of effort
            into formatting data to ensure user names are dynamically updated from the MIT Touchstone
            or Google login and thus avoid any potential for future deadnaming. This required
            implementing efficient, real-time queries to cross-check user names during login and
            dynamically updating post/comment creator names based on the current user data.
            (<i>Always feel free to share suggestions on how we might further facilitate a respectful
            and inclusive user experience!</i>)
            </li>
            {/* Automated Email Notification Feature for posts, including a distinctive tag. */}
          </ul>
          <p>
            Join us in creating a more sustainable and connected campus community. Let's build a
            future where resources are shared, waste is minimized, and collaboration thrives.
          </p>
          <h2>
            <a href="mailto: unsubscribe-admin@mit.edu">Our Team:</a>
          </h2>
          <div className="About-profilesContainer">
            <div className="About-subContainerGutter"/>
            <div className="About-subContainer u-textCenter">
              <h4 className="About-subTitle">Ari Peró</h4>
              <img className="About-avatar" src={ari} alt="Photo of Ari Peró" />
            </div>
            <div className="About-subContainer u-textCenter">
              <h3 className="About-subTitle">Gabriel Rodríguez</h3>
              <img className="About-avatar" src={gabe} alt="Photo of Gabriel Rodríguez" />
            </div>
            <div className="About-subContainer u-textCenter">
              <h4 className="About-subTitle">Anna Kwon</h4>
              <img className="About-avatar" src={anna} alt="Photo of Anna Kwon" />
            </div>
            <div className="About-subContainerGutter"/>
          </div>
          <div className="About-thanksContainer">
            <h2>Special Thanks to:</h2>
            <ul>
              <li>
                <strong>
                  <a href="https://weblab.mit.edu/team/">Weblab Staff</a>
                </strong>
                <ul className="a">
                  <li>
                    To Jay Hilton, especially, for putting up with our many, many questions about
                    lessening Typescript's anger at us and also calling my keyboard cool B).
                  </li>
                </ul>
              </li>
              <li>
                <strong>Render and Mobi, for sponsoring this production</strong>
              </li>
            </ul>

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
      </div>
    </div>
  );
};

export default About;
