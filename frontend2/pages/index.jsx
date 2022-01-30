import styles from "./index.module.css";
import { useEffect, useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

import { followListInfoQuery, searchUserInfoQuery } from "../components/cc-utils/query";
import { FollowListInfoResp, SearchUserInfoResp, Network } from "../components/cc-utils/types";
import { formatAddress, removeDuplicate, isValidAddr } from "../components/cc-utils/helper";
import { useCC } from "../components/cc-utils/ccProvider";
import { WalletConnectButton } from "../components/WalletConnectButton";

const NAME_SPACE = "CyberConnect";
const NETWORK = Network.ETH;
const FIRST = 10; // The number of users in followings/followers list for each fetch

const Home = () => {
  const { address, cyberConnect } = useCC();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [searchAddrInfo, setSearchAddrInfo] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const [followListInfo, setFollowListInfo] = useState(null);
  const [followLoading, setFollowLoading] = useState(false);

  const fetchSearchAddrInfo = async (toAddr) => {
    const resp = await searchUserInfoQuery({
      fromAddr: address,
      toAddr,
      namespace: NAME_SPACE,
      network: NETWORK,
    });
    if (resp) {
      setSearchAddrInfo(resp);
    }
  };

  const handleFollow = async () => {
    if (!cyberConnect || !searchAddrInfo) {
      return;
    }

    try {
      setFollowLoading(true);

      // Execute connect if the current user is not following the search addrress.
      if (!searchAddrInfo.followStatus.isFollowing) {
        await cyberConnect.connect(searchInput);

        // Overwrite the local status of isFollowing
        setSearchAddrInfo((prev) => {
          return !!prev
            ? {
                ...prev,
                followStatus: {
                  ...prev.followStatus,
                  isFollowing: true,
                },
              }
            : prev;
        });

        // Add the new following to the current user followings list
        setFollowListInfo((prev) => {
          return !!prev
            ? {
                ...prev,
                followingCount: prev.followingCount + 1,
                followings: {
                  ...prev.followings,
                  list: removeDuplicate(
                    prev.followings.list.concat([searchAddrInfo.identity])
                  ),
                },
              }
            : prev;
        });

        setSnackbarText("Follow Success!");
      } else {
        await cyberConnect.disconnect(searchInput);

        setSearchAddrInfo((prev) => {
          return !!prev
            ? {
                ...prev,
                followStatus: {
                  ...prev.followStatus,
                  isFollowing: false,
                },
              }
            : prev;
        });

        setFollowListInfo((prev) => {
          return !!prev
            ? {
                ...prev,
                followingCount: prev.followingCount - 1,
                followings: {
                  ...prev.followings,
                  list: prev.followings.list.filter((user) => {
                    return user.address !== searchAddrInfo.identity.address;
                  }),
                },
              }
            : prev;
        });

        setSnackbarText("Unfollow Success!");
      }

      setSnackbarOpen(true);
    } catch (e) {
      console.error(e);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleInputChange = async (value) => {
    setSearchInput(value);

    if (isValidAddr(value) && address && address === searchInput) {
      setSearchLoading(true);
      await fetchSearchAddrInfo(value);
    }
    setSearchLoading(false);
  };

  // Get the current user followings and followers list
  const initFollowListInfo = async () => {
    if (!address) {
      return;
    }

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
  };

  const fetchMore = async (type /* "followings" | "followers"*/) => {
    if (!address || !followListInfo) {
      return;
    }

    const params =
      type === "followers"
        ? {
            address,
            namespace: NAME_SPACE,
            network: NETWORK,
            followerFirst: FIRST,
            followerAfter: followListInfo.followers.pageInfo.endCursor,
          }
        : {
            address,
            namespace: NAME_SPACE,
            network: NETWORK,
            followingFirst: FIRST,
            followingAfter: followListInfo.followings.pageInfo.endCursor,
          };

    const resp = await followListInfoQuery(params);
    if (resp) {
      type === "followers"
        ? setFollowListInfo({
            ...followListInfo,
            followers: {
              pageInfo: resp.followers.pageInfo,
              list: removeDuplicate(
                followListInfo.followers.list.concat(resp.followers.list)
              ),
            },
          })
        : setFollowListInfo({
            ...followListInfo,
            followings: {
              pageInfo: resp.followings.pageInfo,
              list: removeDuplicate(
                followListInfo.followings.list.concat(resp.followings.list)
              ),
            },
          });
    }
  };

  useEffect(() => {
    initFollowListInfo();
  }, [address]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img
          src="/cyberconnect-logo.png"
          alt="CyberConnect Logo"
          width="100%"
          height="100%"
        />
      </div>
      <div className={styles.discription}>
        <p>
          This is a{" "}
          <a
            className={styles.link}
            href="https://docs.cyberconnect.me/"
            target="_blank" rel="noreferrer"
          >
            CyberConnect
          </a>{" "}
          starter app. You can freely use it as a base for your application.{" "}
        </p>
        <p>
          This app displays the current user&apos;s followings and followers. It
          also allows the user to follow/unfollow a wallet address.
        </p>
        <p>Try it yourself!</p>
      </div>
      <WalletConnectButton />
      {address && (
        <div className={styles.searchSection}>
          <div className={styles.inputContainer}>
            <TextField
              onChange={(e) => handleInputChange(e.target.value)}
              className={styles.textField}
              placeholder="Please input the Address you want to follow."
            />
            <LoadingButton
              onClick={handleFollow}
              disabled={
                searchLoading ||
                !isValidAddr(searchInput) ||
                !address ||
                address === searchInput
              }
              loading={followLoading}
              className={styles.loadingButton}
            >
              {!searchAddrInfo?.followStatus.isFollowing
                ? "Follow"
                : "Unfollow"}
            </LoadingButton>
          </div>
          {!isValidAddr(searchInput) ? (
            <div className={styles.error}>Please enter a valid address.</div>
          ) : address === searchInput ? (
            <div className={styles.error}>You can’t follow yourself : )</div>
          ) : (
            <div className={styles.isFollowed}>
              This user{" "}
              {searchAddrInfo?.followStatus.isFollowed
                ? "is following you"
                : "has not followed you yet"}
            </div>
          )}
        </div>
      )}
      {followListInfo && (
        <div className={styles.listsContainer}>
          <div className={styles.list}>
            <div className={styles.subtitle}>
              You have <strong>{followListInfo.followerCount}</strong>{" "}
              followers:
            </div>
            <div className={styles.followList}>
              {followListInfo.followers.list.map((user) => {
                return (
                  <div key={user.address} className={styles.user}>
                    <Avatar src={user.avatar} className={styles.avatar} />
                    <div className={styles.userAddress}>
                      {user.ens || formatAddress(user.address)}
                    </div>
                  </div>
                );
              })}
              {followListInfo.followers.pageInfo.hasNextPage && (
                <LoadingButton onClick={() => fetchMore("followers")}>
                  See More
                </LoadingButton>
              )}
            </div>
          </div>
          <div className={styles.list}>
            <div className={styles.subtitle}>
              You have <strong>{followListInfo.followingCount}</strong>{" "}
              followings:
            </div>
            <div className={styles.followList}>
              {followListInfo.followings.list.map((user) => {
                return (
                  <div key={user.address} className={styles.user}>
                    <Avatar src={user.avatar} className={styles.avatar} />
                    <div className={styles.userAddress}>
                      {user.ens || formatAddress(user.address)}
                    </div>
                  </div>
                );
              })}
              {followListInfo.followings.pageInfo.hasNextPage && (
                <LoadingButton onClick={() => fetchMore("followings")}>
                  See More
                </LoadingButton>
              )}
            </div>
          </div>
        </div>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarText}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Home;
