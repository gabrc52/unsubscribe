import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { get, post } from "../utilities";
import NavBar from "./modules/NavBar.js";
import Login from "./modules/Login";
import NotFound from "./pages/NotFound";
import Feed from "./pages/Feed";
import YourPosts from "./pages/YourPosts";
// import Skeleton from "./pages/Skeleton";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import "../utilities.css";
import "./App.css";

const App = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          // TRhey are registed in the database and currently logged in.
          setUserId(user._id);
          setLoggedIn(true);
        }
      })
      .then(() =>
        socket.on("connect", () => {
          post("/api/initsocket", { socketid: socket.id });
        })
      );
  }, []);

  const handleLogin = (credentialResponse: CredentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken as string) as { name: string; email: string };
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  // NOTE:
  // All the pages need to have the props extended via RouteComponentProps for @reach/router to work properly. Please use the Skeleton as an example.
  return (
    <>
      <BrowserRouter>
        {/* Check if logged in, else show Login */}
        {loggedIn ? (
          <>
            <NavBar userId={userId} /> 
            {/* only want to b able to log OUT from navbar */}
            {/* <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} /> */}
            <div className="App-container">
              <Routes>
                {/* <Route
                  element={
                    <Skeleton handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
                  }
                  path="/"
                /> */}
                <Route path="/" element={<Feed userId={userId} />} />
                <Route path="/profile/:userId" element={<YourPosts userId={userId} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<Login handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
