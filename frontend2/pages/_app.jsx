import React, { Children, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import { StyledEngineProvider } from "@mui/material";
import { useRouter } from "next/router";

import redux from "../redux/store";
import { SET_THEME } from "../redux/actions";
import { CCContextProvider } from "../components/cc-utils/ccProvider";
import { UserProvider } from "../components/signin/userProvider";
import "./_app.css";

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
    <StyledEngineProvider injectFirst>
      <Provider store={redux.store}>
        <PersistGate loading={null} persistor={redux.persistor}>
          <CCContextProvider>
            <UserProvider>
              <Wrapper WrappedComponent={Component} {...pageProps} />
            </UserProvider>
          </CCContextProvider>
        </PersistGate>
      </Provider>
    </StyledEngineProvider>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default MyApp;
