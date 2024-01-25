import React, { useState, useEffect } from "react";

import "./SingleUser.css";
import User from "../../../../shared/User";

type Props = {
  setActiveUser: (user: User) => void;
  user: User;
  active: boolean;
};

/**
 * Component to render an online user
 */
const SingleUser = (props: Props) => {
  return (
    <div
      className={`SingleUser-container u-pointer ${
        props.active ? "SingleUser-container--active" : ""
      }`}
      onClick={() => {
        props.setActiveUser(props.user);
      }}
    >
      {props.user.name}
    </div>
  );
};

export default SingleUser;
