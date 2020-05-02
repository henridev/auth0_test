import React from "react";
import { Link } from "react-router-dom";

export default function Home({ auth }) {
  return (
    <div>
      <h1>home</h1>
      {!auth.isAuthenticated && (
        <button onClick={auth.login}>Log in bro</button>
      )}
      {auth.isAuthenticated && (
        <div>
          <h2>Welcome!</h2>
          <button>
            <Link to="/profile">Go to my profile</Link>
          </button>
        </div>
      )}
    </div>
  );
}
