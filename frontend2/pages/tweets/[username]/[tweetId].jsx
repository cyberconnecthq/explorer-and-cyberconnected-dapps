import Tweet from "../../../components/tweet";
import { WithMenuBar } from "../../../components/wrappers";

const comp = (props) => {
  return (
    <WithMenuBar>
      <Tweet {...props}></Tweet>
    </WithMenuBar>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default comp;
