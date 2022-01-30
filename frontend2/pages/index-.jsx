import Link from "next/link";
import SignIn from "../components/signin";
//import PrivateRoute from "../components/privateRoute.jsx--";
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";

/*
const Comp = () => {
  return <SignIn></SignIn>;
};*/

const Comp = () => {
  const router = useRouter();
  //const { user } = useUser();
  const user = useSelector((state) => state.user);


  useEffect(() => {
    console.log(user);
    if (user && user.uid && user.token) {
      router.push('/home')
    }
  }, []);

  //return <PrivateRoute exact path="/" component={SignIn} isHome />;
  return <SignIn></SignIn>;
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Comp;
