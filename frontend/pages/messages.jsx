import React from "react";
import { useSelector } from "react-redux";
import { WithMenuBar } from "../components/wrappers";
import { ProfileCorner, Header } from "../components/styles/common";

const Messages = () => {
  const theme = useSelector((state) => state.session.theme);
  return (
    <WithMenuBar>
      <ProfileCorner border={theme.border}>
        <Header color={theme.color} border={theme.border}>
          <h2>Messages</h2>
        </Header>
        <h2 style={{ textAlign: "center", color: theme.color }}>
          Messages coming soon!
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

export default Messages;
