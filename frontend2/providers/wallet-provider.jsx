import React, { useState, useEffect, useContext, useCallback } from "react";
import { shortName } from "../lib/bip39";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const _context = React.createContext({
  address: "",
  signer: null,
  provider: null,
  connect: () => undefined,
  ens: "",
});

const useWallet = () => {
  return useContext(_context);
};
export default useWallet;

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [ens, setEns] = useState("");

  const connect = useCallback(() => {
    const _f = async () => {
      try {
        const web3Modal = new Web3Modal({
          network: "mainnet",
          cacheProvider: true,
          providerOptions: {},
        });
        const web3instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(web3instance);
        setProvider(provider);
        console.log("provider");

        const signer = provider.getSigner();
        setSigner(signer);

        const address = await signer.getAddress();
        setAddress(address);

        const ens = await provider.lookupAddress(address);
        setEns(ens);
      } catch (err) {
        alert("Error: wallet connect. Did you installed MetaMask extesion?");
        console.error(err);
        throw err;
      }
    };
    _f();
  }, []);

  return (
    <_context.Provider
      value={{
        address,
        signer,
        provider,
        ens,
        connect,
      }}
    >
      {children}
    </_context.Provider>
  );
};
