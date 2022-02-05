import React, { useState, useEffect } from "react";
import ALink from "../alink";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SideBarBox, Header, Users, UserFlex, Button } from "../styles/sidebar";
import Loading from "../loading";
import { SET_UPDATE } from "../../redux/actions";
import useLogin from "../../providers/login-provider";
import useCC from "../../providers/cyberconnect-provider";
import { fixUser } from "../../lib/bip39";

const URL = process.env.REACT_APP_BACKEND_URL;

const SideBar = () => {
  const [whoToFollow, setWhoToFollow] = useState(null);
  const [isFollowDisabled, setFollowDisabled] = useState(false);

  const theme = useSelector((state) => state.session.theme);
  const refresh = useSelector((state) => state.volatile.update.refresh);
  const dispatch = useDispatch();
  const { user, token } = useLogin();
  const uid = user.uid;

  useEffect(async () => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    try {
      const res = await axios.get(`${URL}/api/feed/who-to-follow?uid=${uid}`, {
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      res.data.whoToFollow.map((u) => fixUser(u));
      setWhoToFollow(res.data.whoToFollow);
    } catch (err) {
      console.error(err);
    }

    return () => {
      source.cancel();
    };
  }, [refresh]);

  const handleFollow = async (e, idx) => {
    e.preventDefault();
    setFollowDisabled(true);
    await axios.post(
      `${URL}/api/follow`,
      {
        followedId: whoToFollow[idx].uid,
        followerId: uid,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await axios.get(`${URL}/api/feed/who-to-follow?uid=${uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.data.whoToFollow.map((u) => fixUser(u));
    setWhoToFollow(res.data.whoToFollow);
    setFollowDisabled(false);
    dispatch({ type: SET_UPDATE });
  };

  if (!whoToFollow) {
    return <Loading />;
  }

  return (
    <SideBarBox tweetHov={theme.tweetHov}>
      <Header color={theme.color} border={theme.border}>
        <h2>Who to follow</h2>
      </Header>
      <Users>
        {!whoToFollow.length && (
          <p style={{ textAlign: "center", color: theme.color }}>
            No user left to follow
          </p>
        )}
        {whoToFollow.map((_user, idx) => {
          return (
            <ALink href={`/profile/${_user.uid}`} key={idx}>
              <UserFlex color={theme.color} border={theme.border}>
                {_user.avatar && <img src={_user.avatar} />}
                <div>
                  <h3>@{_user.domain}</h3>
                  <p>{_user.shortAddress}</p>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    onClick={(e) => handleFollow(e, idx)}
                    disabled={isFollowDisabled}
                  >
                    Follow
                  </Button>
                </div>
              </UserFlex>
            </ALink>
          );
        })}
      </Users>
    </SideBarBox>
  );
};

export default SideBar;
