import React, { useState, useEffect } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import "./YourPosts.css";
import User from "../../../../shared/User";

// TO DO: IMPORT POSTS FROM FEED OR DATABASE THAT BELONG TO USER

const YourPosts = (props: { userId: string }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    document.title = "Your Posts (and Profile)";
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  if (!user) {
    return <div> Loading! </div>;
  }
  return (
    <>
      <div className="YourPosts-avatarContainer">
        <div className="YourPosts-avatar" /> {/* should be google/mit avatar or upload own */}
      </div>
      <h1 className="YourPosts-name u-textCenter">{user.name}</h1>{" "}
      {/* should be google/mit name, do not allow changes */}
      <hr className="YourPosts-linejj" />
      <div className="u-flex">
        <div className="YourPosts-subContainer u-textCenter">
          <h4 className="YourPosts-subTitle">About Me</h4>
          <div id="profile-description">
            I am really allergic to cats i don't know why i have a catbook
          </div>
        </div>
        <div className="YourPosts-subContainer u-textCenter">
          <h4 className="YourPosts-subTitle">My Favorite Type of Cat</h4>
          <div id="favorite-cat">corgi</div>
        </div>
      </div>
    </>
  );
};

export default YourPosts;
