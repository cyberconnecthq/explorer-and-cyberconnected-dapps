import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useParams, useHistory } from "../use-router";
import { useSelector, useDispatch } from "react-redux";
import Icon from "../icon";
import { LogoWrapper, Motto, Button, Flex } from "../styles/signin";
import { SET_THEME } from "../../redux/actions";
import { logo, motto } from "./paths";
import { Row, Col } from "antd";
import useSignin from "../../providers/signin-provider";

const LogIn = (props) => {
  const { logout, login, isLogined, isLoading, user } = useSignin(); // Loading button state
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogined) {
      dispatch({ type: SET_THEME, payload: "default" });
      //history.push("/home");
      history.replace("/home");
    }
  }, [isLogined]);

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
                onClick={login}
              >
                Sign In
              </Button>
            </div>
          </Flex>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default LogIn;
