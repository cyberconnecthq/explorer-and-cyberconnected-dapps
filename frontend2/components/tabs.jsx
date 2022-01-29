import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {useParams, useHistory} from "./useRouter";
import { useSelector } from "react-redux";
import { Tab } from "./styles/profile";

const Tabs = (props) => {
  // TabList -> [{path,name,title}]
  const { tabList } = props;
  const theme = useSelector((state) => state.theme);
  const { uid, activity } = useParams();
  const activeStyle = {
    borderBottom: "2px solid rgb(29,161,242)",
    color: "rgb(29,161,242)",
  };

  return (
    <Tab border={theme.border}>
      {tabList.map((tab) => {
        const to =
          tab.name === "tweets"
            ? `/profile/${uid}`
            : `/profile/${uid}/${tab.path}`;
        return (
          <Link
            key={tab.name}
            href={to}
            to={to}
            replace={true}
            style={
              activity === tab.name ||
              (activity == undefined && tab.name === "tweets")
                ? activeStyle
                : {}
            }
          >
            <div>{tab.title}</div>
          </Link>
        );
      })}
    </Tab>
  );
};

export default Tabs;
