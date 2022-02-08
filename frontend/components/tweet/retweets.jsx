import React, { useState, useEffect } from "react";
//import { Link, useParams, useHistory } from "react-router-dom";
import ALink from "../alink";
import { useRouter } from "next/router";
import { useParams, useHistory } from "../use-router";
import { useSelector } from "react-redux";
import axios from "axios";
import Modal from "../modal";
import { PeopleFlex, PeopleDetails, UserImage } from "../styles/profile";
import { fixTweet } from "../../lib/bip39";

const URL = process.env.REACT_APP_BACKEND_URL;

const Retweet = () => {
  const [retweets, setRetweets] = useState([]);

  const theme = useSelector((state) => state.session.theme);

  const { uid, tweetId } = useParams();
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const retweets = await axios.get(
        `${URL}/api/tweet/retweet/get-retweets?tweetId=${tweetId}`
      );
      retweets.data.retweets.map((tw) => fixTweet(tw));
      setRetweets(retweets.data.retweets);
    })();
  }, [tweetId]);

  const handleClose = useCallback(() => {
    history.replace(`/${uid}/status/${tweetId}`);
  }, [uid, tweetId]);

  return (
    <Modal
      padding="0 0 80px 0"
      handleClose={handleClose}
      heading="Retweeted by"
    >
      <div>
        {retweets.map((_user) => (
          <ALink key={_user["Retweets.id"]} href={`/profile/${_user.uid}`}>
            <PeopleFlex key={_user.uid} border={theme.border}>
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
                  {/* <div>Following</div> */}
                </PeopleDetails>
                <div>
                  <p style={{ color: theme.color }}>{_user.bio}</p>
                </div>
              </div>
            </PeopleFlex>
          </ALink>
        ))}
      </div>
    </Modal>
  );
};

export default Retweet;
