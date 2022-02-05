import React from "react";
import { useSelector } from "react-redux";
import useLogin from "../providers/login-provider";
import { WithMenuBar } from "../components/wrappers";
import { ProfileCorner, Header } from "../components/styles/common";

const Lists = () => {
  const { user } = useLogin();
  const theme = useSelector((state) => state.session.theme);
  return (
    <WithMenuBar>
      <ProfileCorner border={theme.border}>
        <Header color={theme.color} border={theme.border} para={theme.para}>
          <h2>Lists</h2>
          <p>@{user.domain}</p>
        </Header>
        <h2 style={{ textAlign: "center", color: theme.color }}>
          Lists coming soon!
        </h2>
      </ProfileCorner>
    </WithMenuBar>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {}, 
  };
}

export default Lists;
