import React, { useState, useEffect, useContext, useCallback } from "react";
import { makeName } from "../lib/bip39";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const _context = React.createContext({
  address: "",
  signer: null,
  provider: null,
  connect: () => undefined,
  domain: "",
});

const useWallet = () => {
  return useContext(_context);
};
export default useWallet;

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [domain, setDomain] = useState("");

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

        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        //const domain = await provider.lookupAddress(address);

        setProvider(provider);
        setSigner(signer);
        //setDomain(domain);
        setAddress(address);

        console.log("connect OK!");
      } catch (err) {
        alert("Error: wallet connect. Did you installed MetaMask extesion?");
        console.error(err);
        throw err;
      }
    };
    _f();
  }, []);

  const { Provider } = _context;

  return (
    <Provider
      value={{
        address,
        signer,
        provider,
        domain: domain,
        connect,
      }}
    >
      {children}
    </Provider>
  );
};
