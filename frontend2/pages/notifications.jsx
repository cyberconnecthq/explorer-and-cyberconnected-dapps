import Notifications from "../components/notifications/index";
import {WithMenuBar} from "../components/wrappers";

const comp = (props) => {
  return <WithMenuBar Comp={Notifications} {...props} />;
};


export default comp;
