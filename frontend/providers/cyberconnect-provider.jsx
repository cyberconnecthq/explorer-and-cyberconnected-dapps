/**
 * 
 */

import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { identityQuery } from "../lib/cyberconnect/query";
import { removeDuplicate } from "../lib/cyberconnect/helper";

import CyberConnect from "@cyberlab/cyberconnect";
import useWallet from "./wallet-provider";

const NAME_SPACE = "CCTwitter"; //"CyberConnect";
const NETWORK = "ETH";
const FIRST = 20; // The number of users in followings/followers list for each fetch

const _context = React.createContext({
  identity: null,
  follow: async (toAddress) => undefined,
  unfollow: async (toAddress) => undefined,
});

const useCC = () => {
  return useContext(_context);
};
export default useCC;

export const CCProvider = ({ children }) => {
  const { address, connectWallet } = useWallet();
  const [cyberConnect, setCyberConnect] = useState(null);
  const [identity, setIdentity] = useState(null);

  const follow = useCallback(
    async (toAddr) => {
      try {
        cyberConnect = await getCyberConnect();
        const res = await cyberConnect.connect(toAddr);
      } catch (e) {
        console.error(e);
      } finally {
        //setIsLoading(false);
      }
    },
    [address]
  );
  const unfollow = useCallback(
    async (toAddr) => {
      try {
        cyberConnect = await getCyberConnect();
        const res = await cyberConnect.disconnect(toAddr);
      } catch (e) {
        console.error(e);
      } finally {
        //setIsLoading(false);
      }
    },
    [address]
  );

  const getCyberConnect = async () => {
    if (cyberConnect) {
      return cyberConnect;
    }
    const { provider } = await connectWallet();
    cyberConnect = new CyberConnect({
      provider,
      namespace: NAME_SPACE,
    });
    setCyberConnect(cyberConnect);
    return cyberConnect;
  };

  useMemo(() => getCyberConnect, [address]);

  const init = async () => {
    setCyberConnect(null);

    if (!address) {
      //or no vaild
      return;
    }
    try {
      //setIsLoading(true);
      const { provider } = await connectWallet();
      setCyberConnect(
        new CyberConnect({
          provider,
          namespace: NAME_SPACE,
        })
      );

      const resp = await identityQuery({
        address,
        namespace: NAME_SPACE,
        network: NETWORK,
        followingFirst: FIRST,
        followerFirst: FIRST,
      });

      if (resp) {
        setIdentity(resp);
      }
    } catch (err) {
      console.error(err);
    } finally {
      //setIsLoading(false);
    }
  };

  useMemo(() => {
    init();
  }, [address]);

  const { Provider } = _context;

  return (
    <Provider
      value={{
        identity,
        follow,
        unfollow,
      }}
    >
      {children}
    </Provider>
  );
};
