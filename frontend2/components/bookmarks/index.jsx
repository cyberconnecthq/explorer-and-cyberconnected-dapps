import React from "react";
import { useSelector } from "react-redux";
import { ProfileCorner, Header } from "../styles/common";
import Activity from "../profile/activity";
import  useWLogin from "../signin/provider";

const URL = process.env.REACT_APP_BACKEND_URL;

const BookMarks = () => {
  const {user} = useWLogin();
  const theme = useSelector((state) => state.theme);

  return (
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
  );
};

export default BookMarks;
