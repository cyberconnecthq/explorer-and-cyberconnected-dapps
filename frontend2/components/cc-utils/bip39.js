import { entropyToMnemonic } from "bip39";

const shortMnemonic = (hexVal) => {
  const mnemonic = entropyToMnemonic(hexVal);
  const mnemonicArray = mnemonic.split(" ");
  return `${mnemonicArray[0]} ${mnemonicArray[mnemonicArray.length - 1]}`;
};

const _shortAddress = (address) => {
  const len = address.length;
  return "0x" + address.substr(0, 4) + "..." + address.substring(len - 4, len);
};

export const shortName = (user) => {
  if (typeof user == "string") {
    return shortMnemonic(user);
  } else if (!user.shortName) {
    user.shortName = shortMnemonic(user.uid);
  }
  return user.shortName;
};

export const shortAddress = (user) => {
  if (typeof user == "string") {
    return  _shortAddress(user);
  } else if (!user.shortAddress) {
    user.shortAddress = _shortAddress(user.uid);
  }
  return user.shortAddress;
};
