import Tweet from "../../../../components/tweet/index";
import { WithMenuBar, WithLikeModal } from "../../../../components/wrappers";

const comp = (props) => {
  return (
    <WithMenuBar>
      <WithLikeModal Comp={Tweet} {...props} />
    </WithMenuBar>
  );
};

export default comp;
