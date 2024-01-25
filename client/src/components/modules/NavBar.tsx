import { CredentialResponse, GoogleLogin, googleLogout } from "@react-oauth/google";
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

type Props = {
  userId: string;
  handleLogin: (credentialResponse: CredentialResponse) => void;
  handleLogout: () => void;
};

/**
 * The navigation bar at the bottom of all pages. Takes no props.
 */
const NavBar = (props: Props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Unsubscribe</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
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
