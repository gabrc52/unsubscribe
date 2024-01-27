import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import tim from "../../public/adventure-tim.png";

import "../../utilities.css";
import "./YourPosts.css";
import User from "../../../../shared/User";

// TO DO: IMPORT POSTS FROM FEED OR DATABASE THAT BELONG TO USER

const YourPosts = (props: { userId: string }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    document.title = "Your Posts (and Profile)";

    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, [props.userId]);

  if (!user) {
    return <div> Loading! </div>;
  }

  const renderAvatar = () => {
    // Handle Google or Touchstone avatars
    // console.log(user.picture);
    if (user.picture) {
      return <img className="YourPosts-avatar" src={user.picture} alt="Avatar" />;
    } else {
      // Default avatar or placeholder if login type is unknown
      return <img className="YourPosts-avatar" src={tim} />;
    }
  };

  return (
    <>
      <div className="YourPosts-avatarContainer">{renderAvatar()}</div>
      <h1 className="YourPosts-name u-textCenter">{user.name}</h1>{" "}
      <hr className="YourPosts-linejj" />
      <div className="u-flex"></div>
    </>
  );
};

export default YourPosts;
