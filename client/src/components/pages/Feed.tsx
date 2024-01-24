import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import Card from "../modules/Card.js";
import { NewFoodevent } from "../modules/NewPostInput";

import "./Feed.css";

// type Props = {
//   userId?: string;
//   handleLogin: (credentialResponse: CredentialResponse) => void;
//   handleLogout: () => void;
// };

// TODO: didn't we already declare it? see if we can use `/shared` to put the type definition there
type FoodEventObj = {
  _id: string;
  title: string;
  food_type: string;
  photos: string[];
  content: string;
};

// const Feed = (props: Props) => {
const Feed = (props) => {
  // const { handleLogin, handleLogout } = props;
  const [foodEvents, setFoodEvents] = useState<FoodEventObj[]>([]);

  useEffect(() => {
    document.title = "Food Events";
    get("/api/foodevents").then((foodEventObjs: FoodEventObj[]) => {
      let reversedFoodEventObjs = foodEventObjs.reverse();
      setFoodEvents(reversedFoodEventObjs);
    });
  }, []);

  const handleFoodEventSubmission = (foodEventObj) => {
    setFoodEvents([foodEventObj].concat(foodEvents));
  };

  let foodEventsList: JSX.Element | JSX.Element[];
  const hasFoodEvents = foodEvents.length !== 0;

  if (hasFoodEvents) {
    foodEventsList = foodEvents.map((foodEventObj) => (
      <div key={`FoodEvent_${foodEventObj._id}`} className="email-container">
        <h3>{foodEventObj.title}</h3>
        <p>{foodEventObj.food_type}</p>
        {/* https://stackoverflow.com/questions/40418024/how-to-replace-n-to-linebreaks-in-react-js */}
        <p className="email-body">{foodEventObj.content}</p>
        <div className="email-image-container">
          {foodEventObj.photos.map((url) => (
            <img src={url} className="email-image" />
          ))}
        </div>
      </div>
    ));
  } else {
    foodEventsList = <div>No food events!</div>;
  }
  /*
  if (hasFoodEvents) {
    foodEventsList = foodEvents.map((foodEventObj) => (
      <Card
        key={`Card_${foodEventObj._id}`}
        _id={foodEventObj._id}
        creator_id={foodEventObj.creator_googleid}
        title={foodEventObj.title}
        food_type{foodEventObj.food_type}
        photos={foodEventObj.photos}
        content={foodEventObj.content}
      />
    ));
  } else {
    foodEventsList = <div>No food events!</div>;
  }
  */

  return (
    <span>
      {props.userId && <NewFoodevent onSubmit={handleFoodEventSubmission} />}
      {foodEventsList}
    </span>
  );
};

export default Feed;
