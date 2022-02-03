import React from "react";
import { useSelector } from "react-redux";
import useSignin from "../providers/signin-provider";
import { WithMenuBar } from "../components/wrappers";
import { ProfileCorner, Header } from "../components/styles/common";
import Activity from "../components/profile/activity";

const URL = process.env.REACT_APP_BACKEND_URL;

const BookMarks = () => {
  const { user } = useSignin();
  const theme = useSelector((state) => state.theme);

  return (
    <WithMenuBar>
      <ProfileCorner border={theme.border}>
        <Header
          bg={theme.bg}
          color={theme.color}
          para={theme.para}
          border={theme.border}
        >
          <h2>Bookmarks</h2>
          <p>@ {user.username}</p>
        </Header>
        <Activity
          url={`${URL}/api/bookmarks?uid=${user.uid}`}
          dataKey="bookmarks"
          removeBookmark
          isBookmark
        />
      </ProfileCorner>
    </WithMenuBar>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default BookMarks;
