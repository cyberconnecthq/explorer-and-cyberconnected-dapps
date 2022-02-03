import React from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";

import MenuBar from "./menubar";
import Likes from "./tweet/likes";
import Retweet from "./tweet/retweets";
import SideBar from "./sidebar";

export const WithMenuBar = (props) => {
  const theme = useSelector((state) => state.theme);
  const { children, ...others } = props;
  return (
    <React.Fragment>
      <Row style={{ background: theme.bg }}>
        <Col lg={7} md={5} xs={5}>
          <MenuBar />
        </Col>
        <Col lg={9} md={19} xs={19}>
          {children}
        </Col>
        <Col lg={8} md={0} xs={0}>
          <SideBar />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export const WithLikeModal = (props) => {
  const { children, ...others } = props;
  return (
    <React.Fragment>
      <Likes />
      {children}
    </React.Fragment>
  );
};

export const WithRetweetModal = (props) => {
  const { children, ...others } = props;
  return (
    <React.Fragment>
      <Retweet />
      {children}
    </React.Fragment>
  );
};

export const WithOnlyMenuBar = (props) => {
  const { children, ...others } = props;
  return (
    <Row>
      <Col md={7} xs={5}>
        <MenuBar />
      </Col>
      <Col md={17} xs={19}>
        {children}
      </Col>
    </Row>
  );
};
