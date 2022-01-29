import Tweet from "../../../../components/tweet/index";
import { WithMenuBar, WithLikeModal } from "../../../../components/wrappers";

const comp = (props) => {
  return (
    <WithMenuBar>
      <WithLikeModal Comp={Tweet} {...props} />
    </WithMenuBar>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default comp;
