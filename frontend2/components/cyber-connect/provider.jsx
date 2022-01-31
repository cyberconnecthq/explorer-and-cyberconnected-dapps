import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  followListInfoQuery,
  searchUserInfoQuery,
} from "./query";
import {
  FollowListInfoResp,
  SearchUserInfoResp,
  Network,
} from "./types";

import CyberConnect from "@cyberlab/cyberconnect";
import useWallet from "../wallet/provider";

const NAME_SPACE = "CyberConnect";
const NETWORK = "ETH";
const FIRST = 10; // The number of users in followings/followers list for each fetch

const _context = React.createContext({
  followListInfo: null,
  followLoading: false,
  userInfo: null,
  follow: async (address) => undefined,
  unfollow: async (address) => undefined,
});

const useCC = () => {
  return useContext(_context);
};
export default useCC;

export const CCProvider = ({ children }) => {
  const { address, provider } = useWallet();
  const [ens, setEns] = useState("");
  const [cyberConnect, setCyberConnect] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [followListInfo, setFollowListInfo] = useState(null);
  const [followLoading, setFollowLoading] = useState(false);

  const follow = useCallback(
    async (toAddr) => {
      if (!cyberConnect) {
        return;
      }

      try {
        setFollowLoading(true);

        // Execute connect if the current user is not following the toAddr.
        await cyberConnect.connect(toAddr);

        // Add the new following to the current user followings list
        setFollowListInfo((prev) => {
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
        setFollowLoading(false);
      }
    },
    [cyberConnect]
  );

  const unfollow = useCallback(
    async (toAddr) => {
      if (!cyberConnect) {
        return;
      }

      try {
        setFollowLoading(true);

        // Execute connect if the current user is not following the toAddr.
        await cyberConnect.disconnect(toAddr);

        // Add the new following to the current user followings list
        setFollowListInfo((prev) => {
          let newList = prev.followings.list.filter((user) => {
            return user.address !== toAddr;
          });
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
        setFollowLoading(false);
      }
    },
    [cyberConnect]
  );

  //initFollowListInfo
  useEffect(async () => {
    if (!address) {
      //or no vaild
      setEns("");
      setCyberConnect(null);
      setFollowLoading(false);
      setFollowListInfo(null);
      return;
    }
    try {
      setCyberConnect(
        new CyberConnect({
          provider,
          namespace: NAME_SPACE,
        })
      );

      setFollowLoading(true);

      const resp = await followListInfoQuery({
        address,
        namespace: NAME_SPACE,
        network: NETWORK,
        followingFirst: FIRST,
        followerFirst: FIRST,
      });
      if (resp) {
        setFollowListInfo(resp);
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  }, [provider]);

  return (
    <_context.Provider
      value={{
        ens,
        followListInfo,
        followLoading,
        userInfo,
        follow,
        unfollow,
      }}
    >
      {children}
    </_context.Provider>
  );
};
