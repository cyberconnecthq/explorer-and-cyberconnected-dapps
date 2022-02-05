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
    props: {}, 
  };
}

export default comp;
