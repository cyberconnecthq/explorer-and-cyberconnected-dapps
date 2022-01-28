import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Web3 from "web3";
import Icon from "../icon";
import { LogoWrapper, Motto, Button, Flex } from "../styles/signin";
import { SET_USER, SET_THEME } from "../../redux/actions";
import { logo, motto } from "./paths";
// import { Row, Col } from "../styles/common";
import { Row, Col } from "antd";

const URL = process.env.REACT_APP_SERVER_URL;
let web3 = undefined; // Will hold the web3 instance

const SignIn = (props) => {
  const [loading, setLoading] = useState(false); // Loading button state
  const history = useHistory();
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const onLoggedIn = (login) => {
    setLoading(false);
    dispatch({ type: SET_USER, payload: login.user });
    dispatch({ type: SET_THEME, payload: "default" });
    history.push("/home");
  };

  const _auth = ({ publicAddress, signature }) =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => {
      let res = response.json(); //promise
      return res;
    });

  const _register = (publicAddress) =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/add`, {
      body: JSON.stringify({ publicAddress }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());

  const _signMessage = async ({ publicAddress, nonce }) => {
    try {
      const signature = await web3.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        publicAddress,
        "" // MetaMask will ignore the password argument here
      );

      return { publicAddress, signature };
    } catch (err) {
      throw new Error("You need to sign the message to be able to log in.");
    }
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

    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }

    const publicAddress = coinbase.toLowerCase();
    setLoading(true);

    // find existing user by publicAddress
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/user?publicAddress=${publicAddress}`
    )
      .then((response) => {
        let users = response.json();
        return users;
      })
      // If exist, retrieve him, or register new user by publicAddress.
      .then((users) => {
        return users.length ? users[0] : _register(publicAddress);
      })
      //On retrieved user, sign message in Popup MetaMask confirmation modal.
      .then(_signMessage)
      // Send signature to backend on the /auth route
      .then(_auth)
      // Pass accessToken back to parent component (to save it in localStorage)
      .then(onLoggedIn)
      .catch((err) => {
        window.alert(err);
        setLoading(false);
      });
  };

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
              <h1>See what's happening in the world right now</h1>
              <p>Join twitter today.</p>
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
