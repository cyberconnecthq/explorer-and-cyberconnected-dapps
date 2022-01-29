import Bookmarks from "../components/bookmarks/index";
import { WithMenuBar } from "../components/wrappers";

const comp = (props) => {
  return <WithMenuBar Comp={Bookmarks} {...props} />;
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default comp;
