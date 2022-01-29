import PageNotFound from "../components/pageNotFound";
import {WithOnlyMenuBar} from "../components/wrappers";

const comp = (props) => {
  return <WithOnlyMenuBar Comp={PageNotFound} {...props} />;
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default comp;
