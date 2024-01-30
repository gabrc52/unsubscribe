import React, { useEffect } from "react";
import { NewFoodevent } from "../modules/NewPostInput";
import { post } from "../../utilities"; 

const NewFoodeventPage = () => {
  useEffect(() => {
    document.title = "New Food Event Form";
  }, []);
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
