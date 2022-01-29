import React from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";

import MenuBar from "./menubar/index";
import Likes from "./tweet/likes";
import Retweet from "./tweet/retweets";
import SideBar from "./sidebar/index";


export const WithMenuBar = ({ Comp, props }) => {
  const theme = useSelector((state) => state.theme);
  return (
    <React.Fragment>
      <Row style={{ background: theme.bg }}>
        <Col lg={7} md={5} xs={5}>
          <MenuBar />
        </Col>
        <Col lg={9} md={19} xs={19}>
          <Comp {...props} />
        </Col>
        <Col lg={8} md={0} xs={0}>
          <SideBar />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export const WithLikeModal = ({ Comp, props }) => {
  return (
    <React.Fragment>
      <Likes />
      <Comp {...props} />
    </React.Fragment>
  );
};

export const WithRetweetModal = ({ Comp, props }) => {
  return (
    <React.Fragment>
      <Retweet />
      <Comp {...props} />
    </React.Fragment>
  );
};

export const WithOnlyMenuBar = ({ Comp, props }) => {
  return (
    <Row>
      <Col md={7} xs={5}>
        <MenuBar />
      </Col>
      <Col md={17} xs={19}>
        <Comp {...props} />
      </Col>
    </Row>
  );
};
