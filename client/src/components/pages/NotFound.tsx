import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="NotFound">
      <div className="u-hideOverflow NotFound-container">
        <div className="u-flexColumn NotFound-textContainer">
          <h1>Page Not Found</h1>
          <div>
            <div className="u-flex u-flex-justifyCenter u-flex-alignCenter">
              <center>
                <img src="https://media.tenor.com/TmvqZuZdfqQAAAAM/holy-moly-holy.gif" alt="" />
              </center>
            </div>
            <br></br>
            Unfortunately, this page (<strong>{window.location.pathname}</strong>) doesn't exist.
            <br></br>
            What you see below is what we've got!👇
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
