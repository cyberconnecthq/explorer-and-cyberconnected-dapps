import React from "react";
import { useSelector } from "react-redux";
import useWLogin from "../providers/signin-provider";
import TweetModal from "../components/menubar/tweet-modal";
import Activity from "../components/profile/activity";
import { Tweet } from "../components/styles/home";
import { ProfileCorner, Header } from "../components/styles/common";
import { WithMenuBar } from "../components/wrappers";

const URL = process.env.REACT_APP_BACKEND_URL;
const Home = () => {
  const { user } = useWLogin();
  const uid = user.uid;
  const theme = useSelector((state) => state.theme);

  return (
    <WithMenuBar>
      <ProfileCorner border={theme.border}>
        <Header border={theme.border} bg={theme.bg} color={theme.color}>
          <h2>Home</h2>
        </Header>
        <Tweet border={theme.border}>
          <TweetModal rows={3} />
        </Tweet>
        <Activity url={`${URL}/api/feed?uid=${uid}`} feed />
      </ProfileCorner>
    </WithMenuBar>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Home;
