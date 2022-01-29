import Lists from "../components/lists/index";
import {WithMenuBar} from "../components/wrappers";

const comp = (props) => {
  return <WithMenuBar Comp={Lists} {...props} />;
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default comp;
