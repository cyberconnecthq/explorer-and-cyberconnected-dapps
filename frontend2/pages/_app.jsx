import React, { Children, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import { StyledEngineProvider } from "@mui/material";
import { useRouter } from "next/router";

import { store, persistor } from "../redux/store";
import { SET_THEME } from "../redux/actions";
import { WalletProvider } from "../providers/wallet-provider";
import { WLoginProvider } from "../providers/signin-provider";
import { CCProvider } from "../providers/cyberconnect-provider";
import useWLogin from "../providers/signin-provider";
import "./_app.css";

const Wrapper = ({ WrappedComponent, ...pageProps }) => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { isLogined } = useWLogin();
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(theme).length === 0)
      dispatch({ type: SET_THEME, payload: "default" });
  }, []);

  if (!isLogined && router.pathname != "/") {
    router.replace("/");
    return <div>This is the Contact Us Page</div>;
  }
  if (isLogined && router.pathname == "/") {
    router.replace("/home");
    return <div>This is the Contact Us Page</div>;
  }
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ToastContainer hideProgressBar />
      <WrappedComponent {...pageProps} />
    </React.Suspense>
  );
};

function CCTwitterApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <WalletProvider>
            <WLoginProvider>
              <CCProvider>
                <Wrapper WrappedComponent={Component} {...pageProps} />
              </CCProvider>
            </WLoginProvider>
          </WalletProvider>
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

export default CCTwitterApp;
