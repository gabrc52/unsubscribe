import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import tim from "../../public/adventure-tim.png";
import FoodCard from "../modules/FoodCard"; // Import the FoodCard component
import { Avatar, Grid } from "@mui/material";
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
    get(`/api/user/me/posts`).then((posts) => setUserPosts(posts));
    // console.log("userPosts is", userPosts[0]);
  }, []);

  if (!user) {
    return <div> Loading! </div>;
  }

  const renderAvatar = (user: User) => {
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

  const getRandomPersonalMessage = (tier) => {
    const messages = {
      lessThan5: [
        "You're a food waste warrior in the making! Keep those posts coming ;)",
        "Every post means one less 'unsubscribe pls🥺' making it to free-foods xD (claims unverified...)",
      ],
      between5And9: [
        "Thanks for being a food waste warrior! Every post makes a difference :)",
        "You're a super poster! Your foodie adventures are making waves.",
      ],
      between10And24: [
        "You're a free food fiend! Your posts are spreading true culinary joy :P",
        "Feaster of freebies! Poster of the delicious!",
      ],
      between25And49: [
        "You're a foodie legend! Your posts have reached legendary status.",
        "Legendary muncher! Your posts are the stuff of food folklore.",
      ],
      fiftyOrMore: [
        "You're a true Unsubscribe champion! Your posts have set the bar high.",
        "Champion of munching! Your posts are a *feast* for the eyes.",
      ],
    };

    const randomIndex = Math.floor(Math.random() * 2); // Randomly choose between two messages
    return messages[tier][randomIndex];
  };

  const getPersonalMessage = () => {
    const numberOfPosts = userPosts.length;

    if (numberOfPosts < 5) {
      return getRandomPersonalMessage("lessThan5");
    } else if (numberOfPosts < 10) {
      return getRandomPersonalMessage("between5And9");
    } else if (numberOfPosts < 25) {
      return getRandomPersonalMessage("between10And24");
    } else if (numberOfPosts < 50) {
      return getRandomPersonalMessage("between25And49");
    } else {
      return getRandomPersonalMessage("fiftyOrMore");
    }
  };

  return (
    <>
      <div className="YourPosts-container">
        <div>
          <h1 className="YourPosts-name u-flex u-flex-alignCenter">
            {renderAvatar(user)} &nbsp;{user.name}
          </h1>
          <p className="YourPosts-congratulatory-message u-flex u-textCenter u-flex-alignCenter">
            {getPersonalMessage()}
          </p>
        </div>
        <hr className="YourPosts-linejj" />
        <div className="YourPosts-feed u-flex u-flex-alignCenter">
          <Grid container spacing={2.5}>
            {userPosts.map((post) => (
              <Grid item key={post._id} xs={12} sm={6} md={3}>
                <FoodCard {...post} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default YourPosts;
