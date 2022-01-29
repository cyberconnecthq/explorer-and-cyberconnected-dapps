import bip39 from "bip39";

export const shortName = (hexVal: string): string => {
  const mnemonicArray = bip39.entropyToMnemonic(hexVal);

  //return mnemonicArray[0]+" "+mnemonicArray[mnemonicArray.length-1];
  return `${mnemonicArray[0]} ${mnemonicArray[mnemonicArray.length-1]}`;
};
