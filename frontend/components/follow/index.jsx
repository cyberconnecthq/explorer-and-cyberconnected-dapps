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
import { fixUser, domain } from "../../lib/bip39";
import useLogin from "../../providers/login-provider";

const URL = process.env.REACT_APP_BACKEND_URL;

const Follow = () => {
  const [data, setData] = useState(null);
  const [followDisabled, setFollowDisabled] = useState(false);

  const { uid, activity } = useParams();
  const { user: me, token } = useLogin();
  const myId = me.uid;
  //const refresh = useSelector((state) => state.volatile.update.refresh);
  const theme = useSelector((state) => state.session.theme);
  const dispatch = useDispatch();

  useEffect(async () => {
    const { data: users } = await axios.get(`${URL}/api/user/get?uid=${uid}`);
    const { data: res } = await axios.get(
      `${URL}/api/follow/details?uid=${uid}&myId=${myId}`
    );
    if (users.length == 0) {
      return;
    }
    setData({
      user: fixUser(users[0]),
      following: res.following.map((u) => ({
        ...fixUser(u),
        unfollow: false,
      })),
      followers: res.followers.map((u) => ({
        ...fixUser(u),
        unfollow: false,
      })),
    });
  }, [uid, myId]);

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
    setData({
      ...data,
      [activity]: [
        ...data[activity].slice(0, idx),
        {
          ...data[activity][idx],
          isFollowing: follow,
          unfollow: follow,
        },
        ...data[activity].slice(idx + 1),
      ],
    });
    setFollowDisabled(false);
    dispatch({ type: SET_UPDATE });
  };

  const handleMouseOver = (idx) => {
    setData({
      ...data,
      [activity]: [
        ...data[activity].slice(0, idx),
        {
          ...data[activity][idx],
          unfollow: !data[activity][idx].unfollow,
        },
        ...data[activity].slice(idx + 1),
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

  if (!data) {
    return <Loading />;
  }
  return (
    <ProfileCorner border={theme.border}>
      <ProfileHeader
        heading1={`2345`}
        heading2={`@${data.user.domain}`}
        heading={"@" + data.user.domain}
        text={`${data.user.shortAddress}`}
      />
      <Tabs tabList={tabList} />
      {!data[activity].length ? (
        <EmptyMsg>
          {activity === "following"
            ? `@${data.user.domain} doesn't follow anyone!`
            : `@${data.user.domain} has no followers!`}
        </EmptyMsg>
      ) : (
        <div>
          {data[activity].map((_user, idx) => (
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
                          <h3 style={{ color: theme.color }}>{_user.domain}</h3>
                        </ALink>
                      </object>
                      <object>
                        <ALink href={`/profile/${_user.uid}`}>
                          <p>@{_user.domain}</p>
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
