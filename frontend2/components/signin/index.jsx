import React, { useState } from "react";
import {useRouter} from "next/router";
import { useParams, useHistory } from "../useRouter";
import { useSelector, useDispatch } from "react-redux";
import Web3 from "web3";
import Icon from "../icon";
import { LogoWrapper, Motto, Button, Flex } from "../styles/signin";
import { SET_USER, SET_THEME } from "../../redux/actions";
import { logo, motto } from "./paths";
// import { Row, Col } from "../styles/common";
import { Row, Col } from "antd";
import { shortName } from "../cc-utils/bip39";

const URL = process.env.REACT_APP_BACKEND_URL;
let web3 = undefined; // Will hold the web3 instance

const SignIn = (props) => {
  const [loading, setLoading] = useState(false); // Loading button state
  const history = useHistory();
  const dispatch = useDispatch();

  const onLoggedIn = (res) => {
    setLoading(false);
    dispatch({ type: SET_USER, payload: res.user });
    dispatch({ type: SET_THEME, payload: "default" });
    history.push("/home");
  };

  const handleLogin = async () => {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      window.alert("Please install MetaMask first.");
      return;
    }

    if (!web3) {
      try {
        // Request account access if needed
        await window.ethereum.enable();

        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        web3 = new Web3(window.ethereum);
      } catch (error) {
        window.alert("You need to allow MetaMask.");
        return;
      }
    }

    let _coinbase = await web3.eth.getCoinbase();
    if (!_coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }

    const coinbase = _coinbase.substring(2);
    const publicAddress = coinbase.toUpperCase();
    console.log(publicAddress);
    setLoading(true);

    //mainframe for auth with metamask.
    // find existing user by id(publicAddress)
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/get?id=${publicAddress}`
    )
      .then((response) => {
        let users = response.json();
        return users;
      })
      // If exist, retrieve him, or add new user by publicAddress.
      .then((users) => {
        return users.length ? users[0] : _register(publicAddress);
      })
      //On retrieved user, sign message in Popup MetaMask confirmation modal.
      .then(_signMessage)
      // Send signature to backend on the /user/auth route
      .then(_auth)
      // Pass accessToken back to parent component (to save it in localStorage)
      .then(onLoggedIn)
      .catch((err) => {
        window.alert(err);
        setLoading(false);
      });
  };

  const _register = (publicAddress) =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/add`, {
      body: JSON.stringify({
        uid: publicAddress,
        username: shortName(publicAddress),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => {
      if(response.ok){
        return response.json();
      }else{
        throw new Error("User Add Failed.");
      }
    });

  const _signMessage = async (_user) => {
    const { uid, nonce } = _user;
    try {
      const SIGN_MSG = `CyberConnect Twitter Login : ${nonce}`;
      const signature = await web3.eth.personal.sign(
        SIGN_MSG,
        "0x" + uid,
        "" // MetaMask will ignore the password argument here
      );
      console.log(signature)
      return { uid, signature };
    } catch (err) {
      throw new Error("You cancelled sign or Sign Error occured.");
    }
  };

  const _auth = ({ uid, signature }) =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/auth`, {
      body: JSON.stringify({ uid, signature }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => {
      console.log("auth")
      if (response.ok) {
        let res = response.json(); //promise
        return res;
      } else {
        throw new Error(`Auth Error!`);
      }
    });

  return (
    <React.Fragment>
      <Row>
        <Col
          md={12}
          xs={24}
          style={{ overflow: "hidden", position: "relative" }}
        >
          <LogoWrapper>
            <Icon d={logo} height="130vh" fill="rgb(29,161,242)" />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              {motto.map((item) => (
                <Motto key={item.text}>
                  <Icon
                    d={item.path}
                    width="28.75px"
                    height="28.75px"
                    fill="rgb(255,255,255)"
                  />
                  <span>{item.text}</span>
                </Motto>
              ))}
            </div>
          </LogoWrapper>
        </Col>
        <Col md={12} xs={24} style={{ padding: "15px" }}>
          <Flex>
            <div>
              <Icon
                d={logo}
                width="41.25px"
                height="41.25px"
                fill="rgb(29,161,242)"
              />
              <h1>CyberConnect Twitter</h1>
              <p>What&apos;s happening in the world now?</p>
              <p>Twitter says that.</p>
              <p>Join with only Wallets</p>
              <p>with no email, no password, no social account.</p>
              <Button
                bg="rgb(29,160,240)"
                color="rgb(255,255,255)"
                hovbg="rgb(26, 146, 220)"
                onClick={handleLogin}
              >
                Login &amp; Sign up
              </Button>
            </div>
          </Flex>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SignIn;
