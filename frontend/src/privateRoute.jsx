import React from "react";
import jwt from "jsonwebtoken";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
  const { isHome } = props;

  const token = useSelector((state) => {
    return state.user.token;
  });
  let isAuthenticated = false;
  try {
    if (token) {
      //jwt.verify(token, process.env.REACT_APP_SECRET_KEY);
      isAuthenticated = true;
    } else {
      console.log("no token");
      isAuthenticated = false;
    }
  } catch (err) {
    console.error(err);
    isAuthenticated = false;
  }

  if (isHome) {
    return isAuthenticated ? (
      <Redirect to={{ pathname: "/home" }} />
    ) : (
      <Route {...props} />
    );
  }
  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: "/" }} />
  );
};

export default PrivateRoute;
