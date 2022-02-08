/**
 * 
 */

import { entropyToMnemonic } from "bip39";

export const domain = (uid) => {
  const mnemonic = entropyToMnemonic(uid);
  const mnemonicArray = mnemonic.split(" ");
  return `${mnemonicArray[0]}.${mnemonicArray[mnemonicArray.length - 1]}.cctw`;
};

const shortAddress = (uid) => {
  const len = uid.length;
  return (
    uid.substr(0, 4).toUpperCase() +
    " ... " +
    uid.substring(len - 5, len).toUpperCase()
  );
};

const defualtUser = {
  address: "",
  uid: "",
  domain: "",
  avatar: "",
  shortAddress: "",
  followingCount: 0,
  followerCount: 0,
  followers: { list: [] },
  followings: { list: [] },
};

export const fixUser = (user) => {
  user = { ...defualtUser, ...user };
  if (!user.uid && user.address) {
    user.uid = user.address.substring(2).toUpperCase();
  }
  if (user.uid && !user.address) {
    user.address = "0x" + user.uid.toLowerCase();
  }
  if (!user.avatar) {
    user.avatar = "/images/avatar/default.png";
  }
  if (user.uid) {
    if (!user.domain) {
      user.domain = domain(user.uid);
    }
    if (!user.shortAddress) {
      user.shortAddress = shortAddress(user.uid);
    }
  }
  return user;
};

export const fixTweet = (tw) => {
  tw.domain = tw.domain || domain(tw.uid);
  tw.shortAddress = shortAddress(tw.uid);
  return tw;
};
