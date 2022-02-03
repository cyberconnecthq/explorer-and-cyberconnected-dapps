import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../../lib/cyber-connect/query";
import useWallet from "../../providers/wallet-provider";
import useCC from "../../providers/cyberconnect-provider";
import useSignin from "../../providers/signin-provider";


const Comp = () => {
  const { user } = useCC();
  const { login } = useSignin();
  const { address, signer, provider, connect } = useWallet();

  useEffect(() => {}, []);

  const handleAuth = useCallback(
    async (ev) => {
      const message = "xxx";
      console.log("xxx");
      console.log(address);
      const signature = await signer.signMessage(
        message,
        address,
        "" // MetaMask will ignore the password argument here
      );

      const res = await auth(address, message, signature);
      console.log("res");
      console.log(res);
    },
    [signer, address]
  );

  return (
    <>
      <button onClick={connect}>connect</button>
      <br />
      <button onClick={login}>login</button>
      <br />
      <button onClick={handleAuth}>auth</button>
    </>
  );
};

export default Comp;
