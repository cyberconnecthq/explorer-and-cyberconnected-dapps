import React from "react";
import { useSelector } from "react-redux";
import { ProfileCorner, Header } from "../styles/common";
import useWLogin from "../../providers/signin-provider";

const Lists = () => {
  const {user} = useWLogin();
  const theme = useSelector((state) => state.theme);
  return (
    <ProfileCorner border={theme.border}>
      <Header color={theme.color} border={theme.border} para={theme.para}>
        <h2>Lists</h2>
        <p>@ {user.username}</p>
      </Header>
      <h2 style={{ textAlign: "center", color: theme.color }}>Coming soon!</h2>
    </ProfileCorner>
  );
};

export default Lists;
