import { CredentialResponse, GoogleLogin, googleLogout } from "@react-oauth/google";
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Unsubscribe</div>
      {/* <div className="NavBar-title u-inlineBlock">|</div>
      <div className="NavBar-title-red u-inlineBlock">Game</div>
      <div className="NavBar-title u-inlineBlock">book</div> */}
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        {/* {props.userId && (
          <Link to={`/profile/${props.userId}`} className="NavBar-link">
            Profile
          </Link>
        )}
        <Link to="/chat/" className="NavBar-link">
          Chat
        </Link>
        <Link to="/game/" className="NavBar-link">
          Game
        </Link>
        <Link to="/llm/" className="NavBar-link">
          LLM
        </Link> */}
        {props.userId ? (
          <a
            className="NavBar-link"
            onClick={(e) => {
              e.preventDefault();
              googleLogout();
              props.handleLogout();
            }}
            href="#"
          >
            Logout
          </a>
        ) : (
          // uhh this shouldn't happen, but ok
          <GoogleLogin onSuccess={props.handleLogin} />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
