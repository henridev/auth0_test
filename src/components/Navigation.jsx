import React from "react";
import { Link } from "react-router-dom";

export default function Navigation({ auth }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/public">Public</Link>
        </li>
        {auth.isAuthenticated && (
          <>
            <li>
              <Link to="/private">Private</Link>
            </li>
            {auth.userHasScopes(["read:courses"]) && (
              <li>
                <Link to="/courses">Courses</Link>
              </li>
            )}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        )}
        <li
          id="logout"
          onClick={auth.isAuthenticated ? auth.logout : auth.login}
        >
          <Link to="/">{auth.isAuthenticated ? "Logout" : "Login"}</Link>
        </li>
      </ul>
    </nav>
  );
}
