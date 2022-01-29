import Profile from "../../components/profile/index";
import {WithMenuBar} from "../../components/wrappers";

const comp = (props) => {
  return <WithMenuBar Comp={Profile} {...props} />;
};


export default comp;
