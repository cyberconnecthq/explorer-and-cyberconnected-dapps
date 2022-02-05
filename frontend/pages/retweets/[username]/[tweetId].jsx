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
    props: {}, 
  };
}
export default comp;
