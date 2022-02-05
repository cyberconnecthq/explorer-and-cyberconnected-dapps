import React, { useState, useEffect } from "react";
import ALink from "../alink";
import { useParams, useHistory } from "../use-router";
import { useSelector } from "react-redux";
import axios from "axios";
import Modal from "../modal";
import { PeopleFlex, PeopleDetails, UserImage } from "../styles/profile";
import { fixTweet } from "../../lib/bip39";

const URL = process.env.REACT_APP_BACKEND_URL;

const Likes = () => {
  const [likes, setLikes] = useState([]);

  const theme = useSelector((state) => state.session.theme);

  const { uid, tweetId } = useParams();
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `${URL}/api/tweet/like/get-likes?tweetId=${tweetId}`
      );
      res.data.likes.map((tw) => fixTweet(tw));
      setLikes(res.data.likes);
    })();
  }, [tweetId]);

  const handleClose = () => {
    history.replace(`/${uid}/status/${tweetId}`);
  };

  return (
    <Modal padding="0 0 80px 0" handleClose={handleClose} heading="Liked by">
      <div>
        {likes.map((_user) => (
          <ALink key={_user["Likes.id"]} href={`/profile/${_user.uid}`}>
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

export default Likes;
