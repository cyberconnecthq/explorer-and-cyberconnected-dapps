import Profile from "../../components/profile";
import { WithMenuBar } from "../../components/wrappers";

const comp = (props) => {
  return (
    <WithMenuBar>
      <Profile {...props}></Profile>
    </WithMenuBar>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {}, 
  };
}

export default comp;
