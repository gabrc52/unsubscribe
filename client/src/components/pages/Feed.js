import React, { useState, useEffect } from "react";
import FoodEventForm from "../FoodEventForm"; 
import { get } from "../../utilities";

const Foods = (props) => {
  const [foodEvents, setFoodEvents] = useState([]);

  useEffect(() => {
    document.title = "Food Events";
    get("/api/foodEvents").then((foodEventObjs) => {
      let reversedFoodEventObjs = foodEventObjs.reverse();
      setFoodEvents(reversedFoodEventObjs);
    });
  }, []);

  const handleFoodEventSubmission = (foodEventObj) => {
    setFoodEvents([foodEventObj].concat(foodEvents));
  };

  let foodEventsList = null;
  const hasFoodEvents = foodEvents.length !== 0;
  
  if (hasFoodEvents) {
    foodEventsList = foodEvents.map((foodEventObj) => (
      <div key={`FoodEvent_${foodEventObj._id}`}>
        <h3>{foodEventObj.title}</h3>
        <p>{foodEventObj.food_type}</p>
        <p>{foodEventObj.photo}</p>
        <p>{foodEventObj.content}</p>
      </div>
    ));
  } else {
    foodEventsList = <div>No food events!</div>;
  }

  return (
    <>
      {props.userId && <FoodEventForm onSubmit={handleFoodEventSubmission} />}
      {foodEventsList}
    </>
  );
};

export default Foods;
