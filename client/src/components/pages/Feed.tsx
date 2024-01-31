import React, { useEffect, useState } from "react";
import FoodEvent from "../../../../shared/FoodEvent";
import { get } from "../../utilities";
import "./Feed.css";

// const Feed = (props: Props) => {
const Feed = (props) => {
  const [foodEvents, setFoodEvents] = useState<FoodEvent[]>([]);

  useEffect(() => {
    document.title = "Food Events";
    get("/api/foodevents").then((foodEventObjs: FoodEvent[]) => {
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

  return (
    <div className="App-container">
      <span>
        {props.userId && `<NewFoodevent onSubmit={handleFoodEventSubmission} />`}
        {foodEventsList}
      </span>
    </div>
  );
};

export default Feed;
