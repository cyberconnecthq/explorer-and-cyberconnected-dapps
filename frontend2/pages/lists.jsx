import React from "react";
import { useSelector } from "react-redux";
import useWLogin from "../providers/signin-provider";
import { WithMenuBar } from "../components/wrappers";
import { ProfileCorner, Header } from "../components/styles/common";

const Lists = () => {
  const { user } = useWLogin();
  const theme = useSelector((state) => state.theme);
  return (
    <WithMenuBar>
      <ProfileCorner border={theme.border}>
        <Header color={theme.color} border={theme.border} para={theme.para}>
          <h2>Lists</h2>
          <p>@ {user.username}</p>
        </Header>
        <h2 style={{ textAlign: "center", color: theme.color }}>
          Coming soon!
        </h2>
      </ProfileCorner>
    </WithMenuBar>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Lists;
