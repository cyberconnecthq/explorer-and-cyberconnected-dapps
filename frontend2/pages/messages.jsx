import Messages from "../components/messages/index";
import {WithMenuBar} from "../components/wrappers";

const comp = (props) => {
  return <WithMenuBar Comp={Messages} {...props} />;
};

export default comp;
