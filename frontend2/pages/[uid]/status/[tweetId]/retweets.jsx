import Tweet from "../../../../components/tweet";
import { WithMenuBar, WithRetweetModal } from "../../../../components/wrappers";

const comp = (props) => {
  return (
    <WithMenuBar>
      <WithRetweetModal>
        <Tweet {...props}></Tweet>
      </WithRetweetModal>
    </WithMenuBar>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default comp;
