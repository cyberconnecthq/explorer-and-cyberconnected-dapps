import PageNotFound from "../components/pageNotFound";
import {WithOnlyMenuBar} from "../components/wrappers";

const comp = (props) => {
  return <WithOnlyMenuBar Comp={PageNotFound} {...props} />;
};

export default comp;
