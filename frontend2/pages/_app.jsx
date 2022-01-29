import React, { Children, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import redux from "../lib/redux/store";
import { SET_THEME } from "../lib/redux/actions";
import "./_app.css";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}


const Wrapper = ({ WrappedComponent, ...pageProps }) => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (Object.keys(theme).length === 0)
      dispatch({ type: SET_THEME, payload: "default" });
  }, []);
  
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ToastContainer hideProgressBar />
      <WrappedComponent {...pageProps} />
    </React.Suspense>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={redux.store}>
      <PersistGate loading={null} persistor={redux.persistor}>
        <Wrapper WrappedComponent={Component} {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

/*
function Post() {
  const router = useRouter();
  const { slug } = router.query;
}*/
export default MyApp;
