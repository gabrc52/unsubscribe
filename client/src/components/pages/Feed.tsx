import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import NewPostInput from "../modules/NewPostInput";
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

type FoodEventObj = {
  _id: string;
  title: string;
  food_type: string;
  photo: string;
  content: string;
};

const Feed = (props: Props) => {
  const { handleLogin, handleLogout } = props;
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

      {props.userId && <NewPostInput onSubmit={handleFoodEventSubmission} />}
      {foodEventsList}
    </GoogleOAuthProvider>
  );
};

export default Feed;
