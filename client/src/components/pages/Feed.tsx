import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import SingleFoodEvent from "../modules/SingleFoodEvent";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from "@react-oauth/google";

import "./Feed.css";

//TODO(weblab student): REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "981540632706-reasvi26mddkv30qenm2b8ka7ejrlqr0.apps.googleusercontent.com";

type Props = {
  userId?: string;
  handleLogin: (credentialResponse: CredentialResponse) => void;
  handleLogout: () => void;
};

const Feed = (props: Props) => {
  const { handleLogin, handleLogout } = props;
  const [foodEvents, setFoodEvents] = useState([]);

  useEffect(() => {
    document.title = "Food Events";
    get("/api/foodevents").then((foodEventObjs) => {
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
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {props.userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={() => console.log("Error Logging in")} />
      )}

      {props.userId && <SingleFoodEvent onSubmit={handleFoodEventSubmission} />}
      {foodEventsList}
    </GoogleOAuthProvider>
  );
};

export default Feed;
