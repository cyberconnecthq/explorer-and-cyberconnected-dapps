import Tweet from "../../../components/tweet/index";
import {WithMenuBar} from "../../../components/wrappers";

const comp = (props) => {
  return <WithMenuBar Comp={Tweet} {...props} />;
};


export default comp;