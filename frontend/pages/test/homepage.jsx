import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { homePageQuery } from "../../lib/cyberconnect/query";
import useWallet from "../../providers/wallet-provider";
import useCC from "../../providers/cyberconnect-provider";
import useLogin from "../../providers/login-provider";

const Comp = () => {

  const handleHomePage = useCallback(async (ev) => {
    try {
      await homePageQuery();
    } catch (err) {
      console.error(err)
      alert(err);
    }
  }, []);

  return (
    <>
      <button onClick={handleHomePage}>homePage</button>
    </>
  );
};

export default Comp;
