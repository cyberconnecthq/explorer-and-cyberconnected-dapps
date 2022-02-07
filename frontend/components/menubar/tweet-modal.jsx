/**
 * 
 */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import UploadButton from "../upload-button";
import { Flex, Button } from "../styles/modal";
import { SET_UPDATE } from "../../redux/actions";
import useLogin from "../../providers/login-provider";

const URL = process.env.REACT_APP_BACKEND_URL;

const TweetModal = (props) => {
  const [text, setText] = useState("");
  const [isTweetDisabled, setIsTweetDisabled] = useState(true);
  const [preview, setPreview] = useState({ image: "", video: "", media: null });

  const { user } = useLogin();
  const theme = useSelector((state) => state.session.theme);
  const dispatch = useDispatch();

  const { handleClose, rows } = props;

  const addTweet = async () => {
    setIsTweetDisabled(true);
    const data = new FormData();
    data.append("uid", user.uid);
    data.append("text", text);
    if (preview.media) data.append("media", preview.media);
    if (preview.image || preview.video){
      data.append("resource_type", preview.image ? "image" : "video");
    }
    const res = await axios.post(`${URL}/api/tweet/add-tweet`, data);
    setIsTweetDisabled(false);
    setText("");
    setPreview({ image: "", video: "", media: null });
    toast("Your tweet was sent");
    dispatch({ type: SET_UPDATE });
    handleClose && handleClose();
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    const isImage = file.type.includes("image");

    reader.onloadend = () => {
      isImage
        ? setPreview({ image: reader.result, video: "", media: file })
        : setPreview({ image: "", video: reader.result, media: file });
    };
  };

  return (
    <React.Fragment>
      <Flex bg={theme.bg} color={theme.color}>
        <div>
          {user.avatar && (
            <img
              src={user.avatar}
              width="49px"
              height="49px"
              style={{ borderRadius: "50%" }}
            />
          )}
        </div>
        <div style={{ width: "100%" }}>
          <textarea
            rows={rows || 5}
            placeholder="Here, please tweet."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              e.target.value
                ? setIsTweetDisabled(false)
                : setIsTweetDisabled(true);
            }}
          ></textarea>
          <div style={{ marginBottom: "10px" }}>
            {preview.image && (
              <img src={preview.image} style={{ width: "100%" }} />
            )}
            {preview.video && (
              <video
                src={preview.video}
                style={{ width: "100%" }}
                controls
              ></video>
            )}
          </div>
          <Flex style={{ alignItems: "center", justifyContent: "flex-end" }}>
            <div>
              <label htmlFor="photo">
                <UploadButton />
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*,video/*"
                onChange={handlePhoto}
                style={{ display: "none" }}
              />
            </div>
            <div>
              <Button
                onClick={addTweet}
                disabled={isTweetDisabled}
                defaultBg={theme.defaultBg}
                darkBg={theme.darkBg}
              >
                Send Tweet
              </Button>
            </div>
          </Flex>
        </div>
      </Flex>
    </React.Fragment>
  );
};

export default TweetModal;
