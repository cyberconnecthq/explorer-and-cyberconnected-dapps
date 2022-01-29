import Tweet from "../../../../components/tweet/index";
import { WithMenuBar, WithRetweetModal } from "../../../../components/wrappers";

const comp = (props) => {
  return (
    <WithMenuBar>
      <WithRetweetModal Comp={Tweet} {...props} />
    </WithMenuBar>
  );
};

export default comp;
