import React, { useEffect, useState } from "react";
import ALink from "../alink";
import { useSelector } from "react-redux";
import axios from "axios";
import { FollowFlex } from "../styles/profile";
import { useParams, useHistory } from "../use-router";
import { useParams, useHistory } from "../use-router";

const URL = process.env.REACT_APP_BACKEND_URL;

const Follower = (props) => {
  const [response, setResponse] = useState(null);

  const { user } = props;

  const { uid } = useParams();
  const myId = useSelector((state) => state.session.login.user.uid);
  const theme = useSelector((state) => state.session.theme);

  useEffect(async () => {
    const res = await axios.get(
      `${URL}/api/follow/details?uid=${user.uid}&myId=${myId}`
    );
    // res.data.followers.map(fixUser);
    setResponse({
      followers: res.data.followers,
      following: res.data.following,
    });
  }, [user]);

  if (!response) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <FollowFlex>
      <div>
        <ALink href={`/profile/${uid}/following`}>
          <p>
            <span style={{ color: theme.color }}>
              {response.following.length}
            </span>{" "}
            <span>Following</span>
          </p>
        </ALink>
      </div>
      <div>
        <ALink href={`/profile/${uid}/followers`}>
          <p>
            <span style={{ color: theme.color }}>
              {response.followers.length}
            </span>{" "}
            <span>Followers</span>
          </p>
        </ALink>
      </div>
    </FollowFlex>
  );
};

export default Follower;
