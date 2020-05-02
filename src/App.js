import React, { useState } from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Callback from "./pages/Callback";
import Profile from "./pages/Profile";
import Public from "./pages/Public";
import Private from "./pages/Private";

import Navigation from "./components/Navigation";
import Auth from "./Auth/Auth";
import Courses from "./pages/Courses";

function App(props) {
  console.log("props.history", props.history);
  const [AuthInstance, setAuth] = useState(new Auth(props.history));
  return (
    <div className="App">
      <Navigation auth={AuthInstance} />
      <div className="body">
        <Route
          exact
          path="/"
          render={(props) => <Home auth={AuthInstance} {...props} />}
        />
        <Route
          exact
          path="/public"
          render={(props) => <Public auth={AuthInstance} {...props} />}
        />
        <Route
          exact
          path="/private"
          render={(props) =>
            AuthInstance.isAuthenticated ? (
              <Private auth={AuthInstance} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          exact
          path="/courses"
          render={(props) =>
            AuthInstance.isAuthenticated &&
            AuthInstance.userHasScopes(["read:courses"]) ? (
              <Courses auth={AuthInstance} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/profile"
          render={(props) =>
            AuthInstance.isAuthenticated ? (
              <Profile auth={AuthInstance} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/callback"
          render={(props) => <Callback auth={AuthInstance} {...props} />}
        />
      </div>
    </div>
  );
}

export default App;
