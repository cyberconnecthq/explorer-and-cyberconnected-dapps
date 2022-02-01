import React, { useState, useEffect } from "react";
import ALink from "../alink";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SideBarBox, Header, Users, UserFlex, Button } from "../styles/sidebar";
import Loading from "../loading";
import { SET_UPDATE } from "../../redux/actions";
import useWLogin from "../../providers/signin-provider";

const URL = process.env.REACT_APP_BACKEND_URL;

const SideBar = () => {
  const [whoFollow, setWhoFollow] = useState(null);
  const [isFollowDisabled, setFollowDisabled] = useState(false);

  const {user} = useWLogin();
  const theme = useSelector((state) => state.theme);
  const uid = user.uid;
  const token = user.token;
  const refresh = useSelector((state) => state.update.refresh);
  const dispatch = useDispatch();

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    (async () => {
      try {
        const res = await axios.get(`${URL}/api/feed/who-follow?uid=${uid}`, {
          cancelToken: source.token,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWhoFollow(res.data.whoFollow);
      } catch (err) {
        console.error(err);
      }
    })();
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
        followedId: whoFollow[idx].uid,
        followerId: uid,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await axios.get(`${URL}/api/feed/who-follow?uid=${uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setWhoFollow(res.data.whoFollow);
    setFollowDisabled(false);
    dispatch({ type: SET_UPDATE });
  };

  if (!whoFollow) return <Loading />;

  return (
    <SideBarBox tweetHov={theme.tweetHov}>
      <Header color={theme.color} border={theme.border}>
        <h2>Who to follow</h2>
      </Header>
      <Users>
        {!whoFollow.length && (
          <p style={{ textAlign: "center", color: theme.color }}>
            No more users left to follow
          </p>
        )}
        {whoFollow.map((user, idx) => (
          <ALink href={`/profile/${user.uid}`} key={user.uid} >
            <UserFlex color={theme.color} border={theme.border}>
              {user.avatar && <img src={user.avatar} />}
              <div>
                <h3>{user.username}</h3>
                <p>@{user.username}</p>
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
        ))}
      </Users>
    </SideBarBox>
  );
};

export default SideBar;
