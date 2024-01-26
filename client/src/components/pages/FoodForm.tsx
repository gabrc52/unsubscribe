import React from "react";
import { NewFoodevent } from "../modules/NewPostInput";
import { post } from "../../utilities"; 
const NewFoodeventPage = () => {
  const addNewFoodevent = (foodevent) => {
    post("/api/foodevent", foodevent).then(() => {});
  };

  return (
    <div>
      <h1>Create a New Food Event</h1>
      <NewFoodevent addNewFoodevent={addNewFoodevent} />
    </div>
  );
};

export default NewFoodeventPage;
