import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import tim from "../../public/adventure-tim.png";
import FoodCard from "../modules/FoodCard"; // Import the FoodCard component

import "../../utilities.css";
import "./YourPosts.css";
import User from "../../../../shared/User";
import FoodEvent from "../../../../shared/FoodEvent"; // Import the FoodEvent type

// TO DO: IMPORT POSTS FROM FEED OR DATABASE THAT BELONG TO USER

const YourPosts = (props: {}) => {
  const [user, setUser] = useState<User>();
  // const [userPosts, setUserPosts] = useState([]); // State to store the user's posts
  const [userPosts, setUserPosts] = useState<FoodEvent[]>([]); // Specify the type

  // useEffect(() => {
  //   document.title = "Your Posts";

  //   get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));

  // get(`/api/user`, { userid: props.userId }).then((userObj) => {
  //   setUser(userObj);
  //   // Fetch the posts made by the current user
  //   get(`/api/user/posts`, { userId: props.userId }).then((posts) => {
  //     setUserPosts(posts);
  //   });

  // Fetch user posts
  // get(`/api/user/posts?userId=${props.userId}`).then((posts) => setUserPosts(posts));
  // }, []);

  useEffect(() => {
    document.title = "Your Posts";
    // Fetch user information
    get("/api/whoami").then((userObj) => setUser(userObj));
    console.log("user is", user?.name);
    get(`/api/user/posts`).then((posts) => setUserPosts(posts));
    console.log("userPosts is", userPosts[0]);
  }, []);

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
      <div className="YourPosts-container">
        <div className="YourPosts-avatarContainer">{renderAvatar()}</div>
        <h1 className="YourPosts-name u-textCenter">{user.name}</h1>{" "}
        <hr className="YourPosts-linejj" />
        <div className="YourPosts-feed u-flex">
          {userPosts.map((post) => (
            <FoodCard key={post._id} {...post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default YourPosts;
