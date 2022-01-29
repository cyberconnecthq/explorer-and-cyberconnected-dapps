import Explore from "../components/explore/index";
import { WithMenuBar } from "../components/wrappers";

const comp = (props) => {
  return (
    <WithMenuBar Comp={Explore} {...props }/>
    );
};

export default comp;
