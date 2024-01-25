import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { CredentialResponse, GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { get, post } from "../utilities";
import NavBar from "./modules/NavBar";
import Login from "./modules/Login";
import NotFound from "./pages/NotFound";
import Feed from "./pages/Feed";
import YourPosts from "./pages/YourPosts";
import Resources from "./pages/Resources";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import "../utilities.css";
import "./App.css";
import { GOOGLE_CLIENT_ID } from "../../../shared/constants";

const App = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  console.log("Welcome to App");

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        console.log("Just called whoami");
        if (user._id) {
          console.log("whoami returned a user", user);
          // They are registed in the database and currently logged in.
          setUserId(user._id);
        }
      })
      .then(() =>
        socket.on("connect", () => {
          post("/api/initsocket", { socketid: socket.id });
        })
      );
  }, []);

  const handleLogin = (credentialResponse: CredentialResponse) => {
    console.log("On handle login, got", credentialResponse);
    const userToken = credentialResponse.credential;
    console.log("userToken is", userToken);
    const decodedCredential = jwt_decode(userToken as string) as { name: string; email: string };
    console.log("decodedCredential is", decodedCredential);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login/google", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {/* Check if logged in, else show Login */}
          {userId ? (
            <>
              {/* only want to b able to log OUT from navbar */}
              {/* TODO: so why is handleLogin there? */}
              <NavBar userId={userId} handleLogin={handleLogin} handleLogout={handleLogout} />
              <Routes>
                <Route path="/" element={<Feed userId={userId} />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/profile/:userId" element={<YourPosts userId={userId} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          ) : (
            <Routes>
              <Route
                path="*"
                element={
                  <Login handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
                }
              />
            </Routes>
          )}
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
