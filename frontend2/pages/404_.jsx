/*
const _404= () => {
  return <h1>404 - Page Not Found</h1>;
};

export default _404;
*/

import PageNotFound from "../components/pageNotFound";
import { WithOnlyMenuBar } from "../components/wrappers";

const comp = (props) => {
  return (
      <WithOnlyMenuBar Comp={Tweet} {...props} />
  );
};

export default comp;
