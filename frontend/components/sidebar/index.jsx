import React, { useState, useEffect } from "react";
import ALink from "../alink";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SideBarBox, Header, Users, UserFlex, Button } from "../styles/sidebar";
import Loading from "../loading";
import { SET_UPDATE } from "../../redux/actions";
import useSignin from "../../providers/signin-provider";
import useCC from "../../providers/cyberconnect-provider";
import { makeUid, makeName, makeShortAddress } from "../../lib/bip39";

const URL = process.env.REACT_APP_BACKEND_URL;

const SideBar = () => {
  const [whoToFollow, setWhoToFollow] = useState(null);
  const { followListInfo } = useCC();
  const [isFollowDisabled, setFollowDisabled] = useState(false);

  const { user } = useSignin();
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
        const res = await axios.get(
          `${URL}/api/feed/who-to-follow?uid=${uid}`,
          {
            cancelToken: source.token,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWhoToFollow(res.data.whoFollow);
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
    setWhoToFollow(res.data.whoFollow);
    setFollowDisabled(false);
    dispatch({ type: SET_UPDATE });
  };

  if (!whoToFollow || !followListInfo) {
    return <Loading />
  };

  const _null = [];
  const followings = followListInfo ? followListInfo.followings.list : [];
  const followers = followListInfo ? followListInfo.followers.list : [];
  const _fixUser = (_user) => {
    makeUid(_user);
    makeName(_user);
    makeShortAddress(_user);
  };

  return (
    <SideBarBox tweetHov={theme.tweetHov}>
      <Header color={theme.color} border={theme.border}>
        <h2>Who I follow</h2>
      </Header>
      <Users>
        {!followings.length && (
          <p style={{ textAlign: "center", color: theme.color }}>
            No user follows me
          </p>
        )}
        {followings.map((_user, idx) => {
          _fixUser(_user);
          return (
            <ALink href={`/profile/${_user.uid}`} key={idx}>
              <UserFlex color={theme.color} border={theme.border}>
                {_user.avatar && <img src={_user.avatar} />}
                <div>
                  <h3>@{_user.username}</h3>
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

      <Header color={theme.color} border={theme.border}>
        <h2>Who I follow</h2>
      </Header>
      <Users>
        {!followers.length && (
          <p style={{ textAlign: "center", color: theme.color }}>
            I follow no user
          </p>
        )}
        {followers.map((_user, idx) => {
          _fixUser(_user);
          return (
            <ALink href={`/profile/${_user.uid}`} key={idx}>
              <UserFlex color={theme.color} border={theme.border}>
                {_user.avatar && <img src={_user.avatar} />}
                <div>
                  <h3>@{_user.username}</h3>
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

      <Header color={theme.color} border={theme.border}>
        <h2>Who follow me</h2>
      </Header>
      <Users>
        {!whoToFollow.length && (
          <p style={{ textAlign: "center", color: theme.color }}>
            No more users to follow
          </p>
        )}
        {whoToFollow.map((user, idx) => (
          <ALink href={`/profile/${user.uid}`} key={user.uid}>
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
