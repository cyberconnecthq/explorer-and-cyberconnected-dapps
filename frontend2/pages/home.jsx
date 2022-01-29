import Home from "../components/home/index";
import {WithMenuBar} from "../components/wrappers";
//import PrivateRoute from "../components/privateRoute.jsx--";


const comp = (props) => {
  return <WithMenuBar Comp={Home} {...props} />;
};

/*
const comp = (props) => {
  return <PrivateRoute exact path="/home" component={<WithMenuBar Comp={Home} {...props} />} />
};*/


export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default comp;
