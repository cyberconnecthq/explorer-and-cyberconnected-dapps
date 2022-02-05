import React, { useState, useEffect, useContext, useCallback } from "react";
import { identityQuery } from "../lib/cyberconnect/query";
import { removeDuplicate } from "../lib/cyberconnect/helper";

import CyberConnect from "@cyberlab/cyberconnect";
import useWallet from "./wallet-provider";

const NAME_SPACE = "CCTwitter"; //"CyberConnect";
const NETWORK = "ETH";
const FIRST = 20; // The number of users in followings/followers list for each fetch

const _context = React.createContext({
  followListInfo: null,
  followLoading: false,
  userInfo: null,
  follow: async (address) => undefined,
  unfollow: async (address) => undefined,
  initFollowListInfo: async () => undefined,
});

const useCC = () => {
  return useContext(_context);
};
export default useCC;

export const CCProvider = ({ children }) => {
  const { address } = useWallet();
  const [cyberConnect, setCyberConnect] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const follow = useCallback(
    async (toAddr) => {
      if (!cyberConnect) {
        return;
      }
      try {
        setIsLoading(true);

        // Execute connect if the current user is not following the toAddr.
        await cyberConnect.connect(toAddr);

        // Add the new following to the current user followings list
        setIdentity((prev) => {
          let newList = removeDuplicate(prev.followings.list.concat([toAddr]));
          return !!prev
            ? {
                ...prev,
                followings: {
                  ...prev.followings,
                  list: newList,
                },
                followingCount: newList.length,
              }
            : prev;
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [cyberConnect]
  );

  const unfollow = useCallback(async () => {}, [cyberConnect]);

  const initIdentity = useCallback(async () => {
    setCyberConnect(null);
    setIsLoading(false);

    if (!address) {
      //or no vaild
      return;
    }
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  }, [address]);

  useEffect(() => {
    //initIdentity();
  }, [address]);

  const { Provider } = _context;

  return (
    <Provider
      value={{
        isLoading,
        identity,
        follow,
        unfollow,
        initIdentity,
      }}
    >
      {children}
    </Provider>
  );
};
