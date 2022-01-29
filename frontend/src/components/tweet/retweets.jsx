import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Modal from "../modal";
import { PeopleFlex, PeopleDetails, UserImage } from "../styles/profile";

const URL = process.env.REACT_APP_BACKEND_URL;

const Retweet = () => {
  const [retweets, setRetweets] = useState([]);

  const theme = useSelector((state) => state.theme);

  const { uid, tweetId } = useParams();
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const retweets = await axios.get(
        `${URL}/api/tweet/retweet/get-retweets?tweetId=${tweetId}`
      );
      setRetweets(retweets.data.retweets);
    })();
  }, []);

  const handleClose = () => {
    history.replace(`/${uid}/status/${tweetId}`);
  };

  return (
    <Modal
      padding="0 0 80px 0"
      handleClose={handleClose}
      heading="Retweeted by"
      children={
        <div>
          {retweets.map((_user) => (
            <Link key={_user["Retweets.id"]} to={`/profile/${_user.uid}`}>
              <PeopleFlex key={_user.uid} border={theme.border}>
                <div>
                  <UserImage src={_user.avatar} />
                </div>
                <div style={{ width: "100%" }}>
                  <PeopleDetails>
                    <div>
                      <object>
                        <Link to={`/profile/${_user.uid}`}>
                          <h3 style={{ color: theme.color }}>
                            {_user.username}
                          </h3>
                        </Link>
                      </object>
                      <object>
                        <Link to={`/profile/${_user.uid}`}>
                          <p>@{_user.username}</p>
                        </Link>
                      </object>
                    </div>
                    {/* <div>Following</div> */}
                  </PeopleDetails>
                  <div>
                    <p style={{ color: theme.color }}>{_user.bio}</p>
                  </div>
                </div>
              </PeopleFlex>
            </Link>
          ))}
        </div>
      }
    />
  );
};

export default Retweet;
