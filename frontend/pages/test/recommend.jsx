import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { registerKey, recommendsQuery } from "../../lib/cyberconnect/query";
import useWallet from "../../providers/wallet-provider";
import useCC from "../../providers/cyberconnect-provider";
import useLogin from "../../providers/login-provider";

const Comp = () => {
  const { address, connectWallet } = useWallet();

  const handleRecommend = useCallback(async (ev) => {
    const { address } = await connectWallet();

    const res = await recommend({ address });
  }, [address]);

  return (
    <>
      <button onClick={handleRecommend}>recommend</button>
    </>
  );
};

export default Comp;
