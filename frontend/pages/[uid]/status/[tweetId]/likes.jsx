import Tweet from "../../../../components/tweet";
import { WithMenuBar, WithLikeModal } from "../../../../components/wrappers";

const comp = (props) => {
  return (
    <WithMenuBar>
      <WithLikeModal>
        <Tweet {...props}></Tweet>
      </WithLikeModal>
    </WithMenuBar>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {}, 
  };
}

export default comp;
