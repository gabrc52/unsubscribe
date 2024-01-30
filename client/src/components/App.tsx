import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { CredentialResponse, GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserIdContext, get, post } from "../utilities";
import NavBar from "./modules/NavBar";
import Login from "./modules/Login";
import NotFound from "./pages/NotFound";
import Feed from "./pages/Feed";
import YourPosts from "./pages/YourPosts";
import Resources from "./pages/Resources";
import Scheduled from "./pages/Scheduled";
import About from "./pages/About";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import "../utilities.css";
import "./App.css";
import { GOOGLE_CLIENT_ID } from "../../../shared/constants";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { CssBaseline, ScopedCssBaseline } from "@mui/material";
import FoodPage from "./pages/FoodPage";
import NewFoodPage from "./pages/NewFood";

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
          setUserId(user.userId);
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
      setUserId(user.userId);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            {/* Check if logged in, else show Login */}
            {userId ? (
              <UserIdContext.Provider value={userId}>
                <NavBar userId={userId} handleLogout={handleLogout} />
                <Routes>
                  <Route path="/" element={<FoodPage />} />
                  <Route path="/food" element={<FoodPage />} />
                  <Route path="/food/new" element={<NewFoodPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/yourposts" element={<YourPosts />} />
                  <Route path="/scheduled" element={<Scheduled />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </UserIdContext.Provider>
            ) : (
              <Login handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
            )}
          </GoogleOAuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
