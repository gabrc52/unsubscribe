import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { CredentialResponse, GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { UserIdContext, get, post } from "../utilities";
import NavBar from "./modules/NavBar";
import Login from "./modules/Login";
import NotFound from "./pages/NotFound";
import YourPosts from "./pages/YourPosts";
import Resources from "./pages/Resources";
import Scheduled from "./pages/FoodCalendar";
import About from "./pages/About";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import "../utilities.css";
import "./App.css";
import { red, deepOrange } from "@mui/material/colors";
import { GOOGLE_CLIENT_ID } from "../../../shared/constants";
import bluelogo from "../public/blue_logo.png";
import yellowlogo from "../public/yellow_logo.png";
import FoodEvent from "../../../shared/FoodEvent";
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

  // Handle notifications
  useEffect(() => {
    if (userId) {
      Notification.requestPermission().then((result) => {
        // TODO: show something if notifications are off
        console.log("We requested notifications permission, got", result);
      });

      const onNewFoodEvent = (foodEvent: FoodEvent) => {
        console.log("NewFoodEvent fired!", foodEvent);
        const notification = new Notification(
          foodEvent.title ?? `${foodEvent.food_type} in ${foodEvent.location}`,
          {
            body: foodEvent.content,
            icon: "/favicon.png",
          }
        );
      };

      socket.on("NewFoodEvent", onNewFoodEvent);

      return () => {
        socket.off("NewFoodEvent", onNewFoodEvent);
      };
    }
  }, [userId]);

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

  // https://medium.com/hypersphere-codes/detecting-system-theme-in-javascript-css-react-f6b961916d48
  // read device theme (only once, since the main reason is that I want to minimize people on dark theme getting light flashes,
  // as opposed to a third setting to use the device setting - which would be more of a stretch goal and would need more
  // than a simple switch in the UI)
  const deviceTheme = window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light";
  const [mode, setMode] = useState(deviceTheme);

  // load theme from local storage if available
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setMode(theme);
    }
  }, []);

  // persist theme changes in local storage
  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      info: { main: "rgb(49, 58, 83)",},
      primary: {
        main: "#f4575b",
        contrastText: "#fff",
      },
      secondary: {
        main: "#001e3c",
        contrastText: "#fff",
      },
      error: {
        main: red[700],
      },
    },
    typography: {
      fontFamily: "Montserrat, Roboto, -apple-system, Segoe UI, sans-serif",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      info: { main: "#fff",},
      primary: {
        main: "#f4575b",
        light: "#f4575b",
        dark: "#f4575b",
        contrastText: "#003c77",
      },
      secondary: {
        main: "#fdb73e",
        light: "#fdb73e",
        dark: "#fdb73e",
        contrastText: "#001e3c",
      },
      error: {
        main: deepOrange.A400,
      },
    },
    typography: {
      fontFamily: "Montserrat, Roboto, -apple-system, Segoe UI, sans-serif",
    },
  });

  const selectedTheme = mode === "dark" ? darkTheme : lightTheme;
  const selectedLogo = mode === "dark" ? yellowlogo : bluelogo;

  return (
    <>
      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />
        <BrowserRouter>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            {/* Check if logged in, else show Login */}
            {userId ? (
              <UserIdContext.Provider value={userId}>
                <NavBar
                  themeMode={mode}
                  setThemeMode={setMode}
                  logo={selectedLogo}
                  handleLogout={handleLogout}
                />
                <Routes>
                  {/* LLMs are actually helpful! https://chat.openai.com/share/5c529995-8331-43b3-82fa-6ee9dcd5c253 */}
                  <Route path="/" element={<Navigate to="/food/latest" replace />} />
                  <Route path="/food" element={<Navigate to="/food/latest" replace />} />
                  <Route path="/food/latest" element={<FoodPage time="latest" view="grid" />} />
                  <Route
                    path="/food/scheduled"
                    element={<FoodPage time="scheduled" view="grid" />}
                  />
                  <Route
                    path="/food/calendar"
                    element={<FoodPage time="scheduled" view="calendar" />}
                  />
                  <Route path="/food/new" element={<NewFoodPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/yourposts" element={<YourPosts />} />
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
