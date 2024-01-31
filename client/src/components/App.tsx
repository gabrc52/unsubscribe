import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { CredentialResponse, GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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
import { red } from "@mui/material/colors";
import { GOOGLE_CLIENT_ID } from "../../../shared/constants";
import { MaterialUISwitch } from "./modules/DarkToggle";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, ScopedCssBaseline, Container, Switch } from "@mui/material";
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

  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#f4575b",
      },
      secondary: {
        main: "#001e3c",
      },
      error: {
        main: red.A400,
      },
    },
    typography: {
      fontFamily: "Montserrat, Roboto, -apple-system, Segoe UI, sans-serif",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            {/* Check if logged in, else show Login */}
            {userId ? (
              <UserIdContext.Provider value={userId}>
                <NavBar darkMode={darkMode} setDarkMode={setDarkMode} handleLogout={handleLogout} />
                <Routes>
                  {/* LLMs are actually helpful! https://chat.openai.com/share/5c529995-8331-43b3-82fa-6ee9dcd5c253 */}
                  <Route path="/" element={<Navigate to="/food/latest" replace />} />
                  <Route path="/food" element={<Navigate to="/food/latest" replace />} />
                  <Route path="/food/latest" element={<FoodPage time="latest" />} />
                  <Route path="/food/scheduled" element={<FoodPage time="scheduled" />} />
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
