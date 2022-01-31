import React from "react";
import { useSelector } from "react-redux";
import TweetModal from "../menubar/tweet-modal";
import Activity from "../profile/activity";
import { Tweet } from "../styles/home";
import { ProfileCorner, Header } from "../styles/common";
import useWLogin from "../../providers/signin-provider";

const URL = process.env.REACT_APP_BACKEND_URL;
const Home = () => {
  const {user}= useWLogin();
  const uid = user.uid;
  const theme = useSelector((state) => state.theme);

  return (
    <ProfileCorner border={theme.border}>
      <Header border={theme.border} bg={theme.bg} color={theme.color}>
        <h2>Home</h2>
      </Header>
      <Tweet border={theme.border}>
        <TweetModal rows={3} />
      </Tweet>
      <Activity url={`${URL}/api/feed?uid=${uid}`} feed />
    </ProfileCorner>
  );
};

export default Home;
