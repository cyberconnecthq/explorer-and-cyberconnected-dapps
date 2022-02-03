
import LogIn from "../components/signin";
//import PrivateRoute from "../components/privateRoute.jsx--";
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSignin from "../providers/signin-provider";


const Comp = () => {
  const router = useRouter();
  const { user } = useSignin();


  useEffect(() => {
    if (user && user.uid && user.token) {
      router.push('/home')
    }
  }, []);

  //return <PrivateRoute exact path="/" component={SignIn} isHome />;
  return <LogIn></LogIn>;
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Comp;
