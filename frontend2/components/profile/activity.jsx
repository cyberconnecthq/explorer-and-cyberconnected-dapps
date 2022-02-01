import React, { useState, useEffect } from "react";
import axios from "axios";
import ALink from "../alink";
import { useRouter } from "next/router";
import Image from "next/image";
import { useParams, useHistory } from "../use-router";
import { useSelector } from "react-redux";
import Like from "./like";
import Retweet from "./retweet";
import Comment from "./comment";
import {
  PeopleFlex,
  TweetDetails,
  EmptyMsg,
  User,
  UserImage,
} from "../styles/profile";
import { isImage, isVideo } from "../media";
import Loading from "../loading";
import Bookmark from "./bookmark";
import Modal from "../modal";
import CommentModal from "../tweet/comment-modal";
import useWLogin from "../../providers/signin-provider";


const URL = process.env.REACT_APP_BACKEND_URL;

const Activity = (props) => {
  const [tweets, setTweets] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tweetId, setTweetId] = useState(null);

  const { uid } = useParams();
  const {user} = useWLogin();
  const myId = user.uid;
  const token = user.token;
  const refresh = useSelector((state) => state.update.refresh);
  const theme = useSelector((state) => state.theme);

  const {
    url,
    dataKey,
    header,
    handleHeaderText,
    feed,
    removeBookmark,
    isBookmark,
  } = props;

  useEffect(() => {
    // ComponentDidMount
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    getData(source);
    return () => {
      source.cancel();
    };
  }, [url, refresh]);

  const getData = async (source) => {
    try {
      const res = await axios.get(url, {
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTweets(res.data.tweets);
      handleHeaderText &&
        handleHeaderText(`${res.data.tweets.length} ${header}`);
    } catch (err) {
      console.error(err);
    }
  };

  const updateDetails = (idx, newState) => {
    setTweets([
      ...tweets.slice(0, idx),
      {
        ...tweets[idx],
        [newState[0][0]]: newState[0][1],
        [newState[1][0]]: newState[1][1],
      },
      ...tweets.slice(idx + 1),
    ]);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  if (!tweets) return <Loading />;

  if (isBookmark && !tweets.length)
    return (
      <div style={{ textAlign: "center", padding: "40px 0px" }}>
        <h3 style={{ fontSize: "19px", fontWeight: 700, color: theme.color }}>
          You haven’t added any Tweets to your Bookmarks yet
        </h3>
        <p>When you do, they’ll show up here.</p>
      </div>
    );

  if (!tweets.length)
    return (
      <EmptyMsg>
        {feed ? "You are all caught up!" : `@${uid} has no ${dataKey} yet!`}
      </EmptyMsg>
    );
  return (
    <React.Fragment>
      {isModalOpen && (
        <Modal handleClose={handleClose} padding="15px">
          <CommentModal handleClose={handleClose} tweetId={tweetId} />
        </Modal>
      )}

      {tweets.map((tweet, idx) => {
        const date = new Date(tweet["Tweets.createdAt"]);
        return (
          <React.Fragment key={idx}>
            <ALink 
              key={tweet["Tweets.id"]}
              href={`/${tweet.uid}/status/${tweet["Tweets.id"]}`}
            >
              <PeopleFlex hover border={theme.border} tweetHov={theme.tweetHov}>
                <User>
                  <UserImage src={tweet.avatar} />
                </User>
                <div style={{ width: "80%" }}>
                  <TweetDetails color={theme.color}>
                    {/* <object> to hide nested <a> warning */}
                    <object>
                      <ALink href={`/profile/${tweet.uid}`} >
                        <h3>@{tweet.username}</h3>
                      </ALink>
                    </object>
                    <p
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "18%",
                      }}
                    >
                      {/*{tweet.username}{tweet.uid}*/}
                    </p>
                    <span>
                      {date.toLocaleString("default", { month: "short" })}{" "}
                      {date.getDate()}{" "}
                      {new Date().getFullYear() !== date.getFullYear() &&
                        date.getFullYear()}
                    </span>
                  </TweetDetails>
                  <div style={{ color: theme.color }}>
                    {tweet["Tweets.text"]}
                  </div>
                  {tweet["Tweets.media"] && isImage(tweet["Tweets.media"]) && (
                    <img
                      src={tweet["Tweets.media"]}
                      style={{ width: "100%" }}
                      width={20} height={20}
                    />
                  )}
                  {tweet["Tweets.media"] && isVideo(tweet["Tweets.media"]) && (
                    <video
                      src={tweet["Tweets.media"]}
                      style={{ width: "100%" }}
                      controls
                    ></video>
                  )}
                  <TweetDetails style={{ justifyContent: "space-between" }}>
                    <Comment
                      tweets={tweets}
                      tweet={tweet}
                      idx={idx}
                      myId={myId}
                      getData={getData}
                      onClick={(e) => {
                        e.preventDefault();
                        setTweetId(tweet["Tweets.id"]);
                        setIsModalOpen(true);
                      }}
                    />

                    <Retweet
                      tweets={tweets}
                      tweet={tweet}
                      idx={idx}
                      updateDetails={updateDetails}
                      myId={myId}
                      getData={getData}
                    />
                    <Like
                      tweets={tweets}
                      tweet={tweet}
                      idx={idx}
                      updateDetails={updateDetails}
                      myId={myId}
                      getData={getData}
                    />
                    <Bookmark
                      tweet={tweet}
                      myId={myId}
                      removeBookmark={removeBookmark}
                    />
                  </TweetDetails>
                </div>
              </PeopleFlex>
            </ALink>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default Activity;
