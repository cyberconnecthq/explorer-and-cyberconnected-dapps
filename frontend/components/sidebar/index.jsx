/**
 * 
 */

import React, { useState, useEffect, useMemo } from "react";
import ALink from "../alink";
import AVLink from "../avlink";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SideBarBox, Header, Users, UserFlex, Button } from "../styles/sidebar";
import Loading from "../loading";
import { SET_UPDATE } from "../../redux/actions";
import useLogin from "../../providers/login-provider";
import useCC from "../../providers/cyberconnect-provider";
import useWallet from "../../providers/wallet-provider";
import { fixUser } from "../../lib/bip39";
import { SET_RECOMMENDS } from "../../redux/actions";
import {
  identityQuery,
  recommendsQuery,
  connectQuery,
  disconnectQuery,
  simpleIdentityQuery,
} from "../../lib/cyberconnect/query";

const URL = process.env.REACT_APP_BACKEND_URL;

const SideBar = () => {
  const { follow, unfollow } = useCC();
  const [whoToFollow, setWhoToFollow] = useState(null);
  const [isFollowDisabled, setFollowDisabled] = useState(false);

  const theme = useSelector((state) => state.session.theme);
  const refresh = useSelector((state) => state.volatile.update.refresh);
  const { user: me, token } = useLogin();
  const myUid = me.uid;

  const { identity } = useCC();
  const recommends = useSelector((state) => state.session.recommends);
  const [followings, setFollowings] = useState([]);
  const { address } = useWallet();
  const dispatch = useDispatch();

  useMemo(async () => {
    if (!address) {
      return;
    }
    try {
      let [recommData, res] = await Promise.all([
        recommendsQuery({ address }),
        axios.get(`${URL}/api/follow/followings-by-uid?uid=${myUid}`),
      ]);

      followings = res.data.followings;
      let followingsSet = new Set();
      followings.map((u) => {
        let _u = fixUser(u);
        followingsSet.add(_u.uid);
        return _u;
      });
      setFollowings(followings);

      recommData = recommData?.data || { list: [] };

      recommData.list = recommData.list.map((u) => fixUser(u));
      recommData.list = recommData.list.filter((u) => {
        return !followingsSet.has(u.uid);
      });
      recommends = recommData;
      dispatch({ type: SET_RECOMMENDS, payload: recommends });
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }, [address, refresh]);

  useMemo(async () => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    try {
      const res = await axios.get(
        `${URL}/api/feed/who-to-follow?uid=${myUid}`,
        {
          cancelToken: source.token,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      res.data.whoToFollow = res.data.whoToFollow.map((u) => fixUser(u));
      setWhoToFollow(res.data.whoToFollow);
    } catch (err) {
      console.error(err);
    }

    return () => {
      source.cancel();
    };
  }, [myUid, refresh]);

  const handleFollow = async (e, targetUser) => {
    e.preventDefault();
    console.log(targetUser);
    setFollowDisabled(true);
    await follow("0x" + targetUser.uid);
    console.log(1);
    await fetch(`${URL}/api/user/add`, {
      body: JSON.stringify({
        uid: targetUser.uid,
        domain: targetUser.domain,
        avatar: targetUser.avatar,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    console.log(2);

    await axios.post(
      `${URL}/api/follow`,
      {
        followedId: targetUser.uid,
        followerId: myUid,
        followerId: myUid,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(3);

    const res = await axios.get(`${URL}/api/feed/who-to-follow?uid=${myUid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(4);

    res.data.whoToFollow = res.data.whoToFollow.map((u) => fixUser(u));
    setWhoToFollow(res.data.whoToFollow);
    setFollowDisabled(false);
    dispatch({ type: SET_UPDATE });
  };

  const handleMore = async () => {alert("no implements")};

  let render;
  if (!whoToFollow) {
    render = <Loading />;
  } else {
    render = (
      <Users>
        {!whoToFollow.length && (
          <p style={{ textAlign: "center", color: theme.color }}>
            No user left to follow
          </p>
        )}
        {whoToFollow.map((_user, idx) => {
          return (
            <object key={idx}>
              <ALink href={`/profile/${_user.uid}`}>
                <UserFlex color={theme.color} border={theme.border}>
                  {_user.avatar && <img src={_user.avatar} />}
                  <div>
                    <h3>@{_user.domain}</h3>
                    <p>0x{_user.shortAddress}</p>
                    <p>
                      <a href="" onClick={(e) => handleFollow(e, _user)}>
                        follow
                      </a>
                    </p>
                  </div>
                  {/*<div style={{ marginLeft: "auto" }}>
                  <Button
                    onClick={(e) => handleFollow(e, _user)}
                    disabled={isFollowDisabled}
                  >
                    Follow
                  </Button>
          </div>*/}
                </UserFlex>
              </ALink>
            </object>
          );
        })}
      </Users>
    );
  }

  return (
    <SideBarBox tweetHov={theme.tweetHov}>
      <>
        <Header color={theme.color} border={theme.border}>
          <h2>Who to follow</h2>
        </Header>
        {render}
        <br />
        <br />
      </>
      <>
        <Header color={theme.color} border={theme.border}>
          <h2>CyberConnect </h2>
          <h2> Recommendations</h2>
        </Header>
        <Users>
          {!recommends.list.length && (
            <p style={{ textAlign: "center", color: theme.color }}>
              No recommendations
            </p>
          )}
          {recommends.list.map((_user, idx) => {
            return (
              <object key={idx}>
                <AVLink>
                  <UserFlex color={theme.color} border={theme.border}>
                    {_user.avatar && <img src={_user.avatar} />}
                    <div>
                      <h3>@{_user.domain}</h3>
                      <p>0x{_user.shortAddress}</p>
                      <p>
                        <a href="" onClick={(e) => handleFollow(e, _user)}>
                          follow
                        </a>
                      </p>
                      <p>{_user.recommendationReason}</p>
                    </div>
                    {/* 
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    onClick={(e) => handleFollow(e, _user)}
                    disabled={isFollowDisabled}
                  >
                    Follow
                  </Button>
                </div>*/}
                  </UserFlex>
                </AVLink>
              </object>
            );
          })}
          {recommends.list.length > 0 && (
            <div style={{ textAlign: "center" }}>
              <Button
                style={{ margin: "10px 20px" }}
                onClick={(e) => handleMore()}
                disabled={isFollowDisabled}
              >
                More ?
              </Button>
            </div>
          )}
        </Users>
      </>
    </SideBarBox>
  );
};

export default SideBar;
