import PageNotFound from "../components/pageNotFound";
import { WithOnlyMenuBar } from "../components/wrappers";

const _404 = (props) => {
  //  return <h1>404 - Page Not Found</h1>;
  return <WithOnlyMenuBar Comp={PageNotFound} {...props} />;
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default _404;
