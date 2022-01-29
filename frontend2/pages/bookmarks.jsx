import Bookmarks from "../components/bookmarks/index";
import { WithMenuBar } from "../components/wrappers";

const comp = (props) => {
  return <WithMenuBar Comp={Bookmarks} {...props} />;
};

export default comp;
