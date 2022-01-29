import Lists from "../components/lists/index";
import {WithMenuBar} from "../components/wrappers";

const comp = (props) => {
  return <WithMenuBar Comp={Lists} {...props} />;
};

export default comp;
