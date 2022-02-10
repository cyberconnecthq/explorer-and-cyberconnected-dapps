import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { registerKey } from "../../lib/cyberconnect/query";
import useWallet from "../../providers/wallet-provider";
import useCC from "../../providers/cyberconnect-provider";
import useLogin from "../../providers/login-provider";

const Comp = () => {
  const { user } = useCC();
  const { login } = useLogin();
  const { address, connectWallet } = useWallet();

  useEffect(() => {}, []);

  const handleAuth = useCallback(
    async (ev) => {
      const { address, signer, provider } = await connectWallet();
      const message = "xxx";
      const signature = await signer.signMessage(
        message,
        address,
        "" // MetaMask will ignore the password argument here
      );

      const res = await auth({address, message, signature});
    },
    [address]
  );

  return (
    <>
      <button onClick={connectWallet}>connect</button>
      <br />
      <button onClick={login}>login</button>
      <br />
      <button onClick={handleAuth}>auth</button>
    </>
  );
};

export default Comp;
