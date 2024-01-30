import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import tim from "../../public/adventure-tim.png";
import FoodCard from "../modules/FoodCard"; // Import the FoodCard component
import { Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import "../../utilities.css";
import "./YourPosts.css";
import User from "../../../../shared/User";
import FoodEvent from "../../../../shared/FoodEvent"; // Import the FoodEvent type

// TO DO: IMPORT POSTS FROM FEED OR DATABASE THAT BELONG TO USER

const YourPosts = (props: {}) => {
  const [user, setUser] = useState<User>();
  // const [userPosts, setUserPosts] = useState([]); // State to store the user's posts
  const [userPosts, setUserPosts] = useState<FoodEvent[]>([]); // Specify the type

  useEffect(() => {
    document.title = "Your Posts";
    // Fetch user information
    get("/api/whoami").then((userObj) => setUser(userObj));
    console.log("user is", user?.name);
    get(`/api/user/posts`).then((posts) => setUserPosts(posts));
    // console.log("userPosts is", userPosts[0]);
  }, []);

  if (!user) {
    return <div> Loading! </div>;
  }

  // const renderAvatar = () => {
  //   // Handle Google or Touchstone avatars
  //   console.log(user.picture);
  //   if (user.picture) {
  //     return <img className="YourPosts-avatar" src={user.picture} alt="Avatar" />;
  //   } else {
  //     // Default avatar or placeholder if login type is unknown
  //     return <img className="YourPosts-avatar" src={tim} />;
  //   }
  // };
  const renderAvatar = () => {
    // Handle Google avatars
    if (user.picture) {
      return <Avatar alt="Avatar" src={user.picture} />;
    } else {
      // Default avatar or placeholder if login type is unknown
      return (
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {user.name.at(0)}
        </Avatar>
      );
    }
  };

  return (
    <>
      <div className="YourPosts-container">
        <div>
        <h1 className="YourPosts-name u-flex u-flex-alignCenter">{renderAvatar()} &nbsp;{user.name}</h1></div>
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
