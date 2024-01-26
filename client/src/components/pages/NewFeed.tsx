import React, { useEffect, useState } from "react";
import FoodEvent from "../../../../shared/FoodEvent";
import { get } from "../../utilities";
import { NewFoodevent } from "../modules/NewPostInput";
import { foodEvents } from "./FoodForm"; 
import "./Feed.css";

const Feed = (props) => {
  let foodEventsList: JSX.Element | JSX.Element[];
  const hasFoodEvents = foodEvents.length !== 0;

  if (hasFoodEvents) {
    foodEventsList = foodEvents.map((foodEventObj) => (
      <div key={`FoodEvent_${foodEventObj._id}`} className="email-container">
        <h3>{foodEventObj.title}</h3>
        <p>{foodEventObj.food_type}</p>
        <p className="email-body">{foodEventObj.content}</p>
        <div className="email-image-container">
          {foodEventObj.photos.map((url, index) => (
            <img src={url} className="email-image" key={index} />
          ))}
        </div>
      </div>
    ));
  } else {
    foodEventsList = <div>No food events!</div>;
  }

  return <div className="App-container">{foodEventsList}</div>;
};

export default Feed;
