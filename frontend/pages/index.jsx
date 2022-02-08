/**
 * 
 */

import LogIn from "../components/login";
//import PrivateRoute from "../components/privateRoute.jsx--";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useLogin from "../providers/login-provider";

const Comp = () => {
  const router = useRouter();
  const { user, token } = useLogin();

  useEffect(() => {
    if (user && user.uid && token) {
      router.push("/home");
    }
  }, []);

  //return <PrivateRoute exact path="/" component={Login} isHome />;
  return <LogIn></LogIn>;
};

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default Comp;
