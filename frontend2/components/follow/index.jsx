import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useParams, useHistory } from "../use-router";

import ALink from "../alink";
import { useSelector, useDispatch } from "react-redux";
import ProfileHeader from "../profile-header";
import Tabs from "../tabs";
import {
  PeopleFlex,
  PeopleDetails,
  EmptyMsg,
  UserImage,
} from "../styles/profile";
import { ProfileCorner, Button } from "../styles/common";
import Loading from "../loading";
import { SET_UPDATE } from "../../redux/actions";
import { shortName, shortAddress } from "../../lib/bip39";
import useWLogin from "../../providers/signin-provider";

const URL = process.env.REACT_APP_BACKEND_URL;

const Follow = () => {
  const [userData, setUserData] = useState(null);
  const [followDisabled, setFollowDisabled] = useState(false);

  const { uid, activity } = useParams();
  const { user } = useWLogin();
  //const refresh = useSelector((state) => state.update.refresh);
  const theme = useSelector((state) => state.theme);
  const myId = user.uid;
  const token = user.token;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { data: user } = await axios.get(
        `${URL}/api/user/get-user?uid=${uid}`
      );
      const { data: res } = await axios.get(
        `${URL}/api/follow/details?uid=${user.uid}&myId=${myId}`
      );
      setUserData({
        user,
        following: res.following.map((item) => ({
          ...item,
          unfollow: false,
        })),
        followers: res.followers.map((item) => ({
          ...item,
          unfollow: false,
        })),
      });
    })();
  }, []);

  const handleFollow = async (e, uid, idx, follow) => {
    e.preventDefault();
    setFollowDisabled(true);
    await axios.post(
      `${URL}/api/follow`,
      {
        followedId: uid,
        followerId: myId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUserData({
      ...userData,
      [activity]: [
        ...userData[activity].slice(0, idx),
        {
          ...userData[activity][idx],
          isFollowing: follow,
          unfollow: follow,
        },
        ...userData[activity].slice(idx + 1),
      ],
    });
    setFollowDisabled(false);
    dispatch({ type: SET_UPDATE });
  };

  const handleMouseOver = (idx) => {
    setUserData({
      ...userData,
      [activity]: [
        ...userData[activity].slice(0, idx),
        {
          ...userData[activity][idx],
          unfollow: !userData[activity][idx].unfollow,
        },
        ...userData[activity].slice(idx + 1),
      ],
    });
  };

  const tabList = [
    {
      name: "following",
      title: "Following",
      path: "following",
    },
    {
      name: "followers",
      title: "Followers",
      path: "followers",
    },
  ];

  if (!userData) return <Loading />;

  return (
    <ProfileCorner border={theme.border}>
      <ProfileHeader
        heading={`@${userData.user.username}`}
        text={`${shortAddress(userData.user)}`}
      />
      <Tabs tabList={tabList} />
      {!userData[activity].length ? (
        <EmptyMsg>
          {activity === "following"
            ? `@${shortName(uid)} doesn't follow anyone!`
            : `@${shortName(uid)} has no followers!`}
        </EmptyMsg>
      ) : (
        <div>
          {userData[activity].map((_user, idx) => (
            <ALink key={_user.uid} href={`/profile/${_user.uid}`}>
              <PeopleFlex
                key={_user.uid}
                border={theme.border}
                tweetHov={theme.tweetHov}
              >
                <div>
                  <UserImage src={_user.avatar} />
                </div>
                <div style={{ width: "100%" }}>
                  <PeopleDetails>
                    <div>
                      <object>
                        <ALink href={`/profile/${_user.uid}`}>
                          <h3 style={{ color: theme.color }}>
                            {_user.username}
                          </h3>
                        </ALink>
                      </object>
                      <object>
                        <ALink href={`/profile/${_user.uid}`}>
                          <p>@{_user.username}</p>
                        </ALink>
                      </object>
                    </div>
                    {_user.uid !== myId && (
                      <React.Fragment>
                        {_user.isFollowing && (
                          <Button
                            disabled={followDisabled}
                            onMouseEnter={() => handleMouseOver(idx)}
                            onMouseLeave={() => handleMouseOver(idx)}
                            onClick={(e) =>
                              handleFollow(e, _user.uid, idx, false)
                            }
                            bg="rgb(29, 161, 242)"
                            hoverBg="rgb(202,32,85)"
                            color="rgb(255,255,255)"
                            padding="2% 5%"
                          >
                            {_user.unfollow ? "Unfollow" : "Following"}
                          </Button>
                        )}
                        {!_user.isFollowing && (
                          <Button
                            disabled={followDisabled}
                            onClick={(e) =>
                              handleFollow(e, _user.uid, idx, true)
                            }
                            bg="transparent"
                            hoverBg="rgba(29, 161, 242,0.1)"
                            color="rgb(29, 161, 242)"
                            padding="2% 5%"
                            border="1px solid rgb(29,161,242)"
                          >
                            Follow
                          </Button>
                        )}
                      </React.Fragment>
                    )}
                  </PeopleDetails>
                  <div>
                    <p style={{ color: theme.color }}>{_user.bio}</p>
                  </div>
                </div>
              </PeopleFlex>
            </ALink>
          ))}
        </div>
      )}
    </ProfileCorner>
  );
};

export default Follow;
