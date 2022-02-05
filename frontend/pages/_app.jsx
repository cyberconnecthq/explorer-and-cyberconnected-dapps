import React, { Children, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import { StyledEngineProvider } from "@mui/material";
import { useRouter } from "next/router";
import Loading from "../components/loading";

import { store, persistor } from "../redux/store";
import { SET_THEME } from "../redux/actions";
import { WalletProvider } from "../providers/wallet-provider";
import { LoginProvider } from "../providers/login-provider";
import { CCProvider } from "../providers/cyberconnect-provider";
import useLogin from "../providers/login-provider";
import "./_app.css";

const Wrapper = ({ WrappedComponent, ...pageProps }) => {
  const theme = useSelector((state) => state.session.theme);
  const dispatch = useDispatch();
  const { isLogined } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(theme).length === 0)
      dispatch({ type: SET_THEME, payload: "default" });
  }, []);
  const refresh = useSelector((state) => state.volatile.update.refresh);
  console.info("App render: " + refresh);

  const TEST_MODE = true;
  if (!TEST_MODE) {
    if (!isLogined && router.pathname != "/") {
      router.replace("/");
      return <Loading />;
    }
    if (isLogined && router.pathname == "/") {
      router.replace("/home");
      return <Loading />;
    }
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
            <CCProvider>
              <LoginProvider>
                <Wrapper WrappedComponent={Component} {...pageProps} />
              </LoginProvider>
            </CCProvider>
          </WalletProvider>
        </PersistGate>
      </Provider>
    </StyledEngineProvider>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default CCTwitterApp;
