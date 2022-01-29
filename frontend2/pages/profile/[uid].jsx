import Profile from "../../components/profile/index";
import {WithMenuBar} from "../../components/wrappers";

const comp = (props) => {
  return <WithMenuBar Comp={Profile} {...props} />;
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default comp;
