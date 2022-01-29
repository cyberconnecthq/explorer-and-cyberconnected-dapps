import Tweet from "../../../../components/tweet/index";
import { WithMenuBar, WithRetweetModal } from "../../../../components/wrappers";

const comp = (props) => {
  return (
    <WithMenuBar>
      <WithRetweetModal Comp={Tweet} {...props} />
    </WithMenuBar>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default comp;
