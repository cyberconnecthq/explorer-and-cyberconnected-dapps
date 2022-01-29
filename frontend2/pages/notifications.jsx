import Notifications from "../components/notifications/index";
import {WithMenuBar} from "../components/wrappers";

const comp = (props) => {
  return <WithMenuBar Comp={Notifications} {...props} />;
};


export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default comp;
