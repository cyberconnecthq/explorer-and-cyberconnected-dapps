import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, recommend } from "../../lib/cyber-connect/query";
import useWallet from "../../providers/wallet-provider";
import useCC from "../../providers/cyberconnect-provider";
import useSignin from "../../providers/signin-provider";

const Comp = () => {
  const { user } = useCC();
  const { login } = useSignin();
  const { address, signer, provider, connect } = useWallet();

  useEffect(() => {}, []);

  const handleRecommend = useCallback(
    async (ev) => {
      const res = await recommend({ address});
      console.log("res");
      console.log(res);
    },
    [address]
  );

  return (
    <>
      <button onClick={connect}>connect</button>
      <br />
      <button onClick={login}>login</button>
      <br />
      <button onClick={handleRecommend}>recommend</button>
    </>
  );
};

export default Comp;
