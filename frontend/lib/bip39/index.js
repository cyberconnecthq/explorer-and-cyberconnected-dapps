import { entropyToMnemonic } from "bip39";

const shortMnemonic = (hexVal) => {
  const mnemonic = entropyToMnemonic(hexVal);
  const mnemonicArray = mnemonic.split(" ");
  return `${mnemonicArray[0]} ${mnemonicArray[mnemonicArray.length - 1]}`;
};

const _shortAddress = (address) => {
  const len = address.length;
  return (
    "0x" +
    address.substr(0, 4).toUpperCase() +
    "..." +
    address.substring(len - 4, len).toUpperCase()
  );
};

export const makeUid = (user) => {
  if (typeof user == "string") {
    return user.substring(2).toUpperCase();
  } else if (!user.uid) {
    user.uid = user.address.substring(2).toUpperCase();
    return user.uid;
  }
};

export const makeName = (user) => {
  if (typeof user == "string") {
    return shortMnemonic(user);
  } else if (!user.username) {
    user.username = shortMnemonic(user.uid);
    return user.username;
  }
};

export const makeShortAddress = (user) => {
  if (typeof user == "string") {
    return _shortAddress(user);
  } else if (!user.shortAddress) {
    user.shortAddress = _shortAddress(user.uid);
    return user.shortAddress;
  }
};
