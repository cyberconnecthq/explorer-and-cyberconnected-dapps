import Home from "../components/home/index";
import {WithMenuBar} from "../components/wrappers";

const comp = (props) => {
  return <WithMenuBar Comp={Home} {...props} />;
};


export default comp;
