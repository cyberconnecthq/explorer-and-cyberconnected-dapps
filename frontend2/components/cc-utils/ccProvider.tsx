import React, { useState, useEffect, useContext, useCallback } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import CyberConnect from '@cyberlab/cyberconnect';


const CCContext = React.createContext({
  connectWallet: async () => undefined,
  address: '',
  ens: '',
  cyberConnect: null,
});

export const useCC = () => {
  return useContext(CCContext);;
};

export const CCContextProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [ens, setEns] = useState('');
  const [cyberConnect, setCyberConnect] = useState(null);

  const _initCyberConnect = useCallback((provider: any) => {
    const _cyberConnect = new CyberConnect({
      provider,
      namespace: 'CyberConnect',
    });

    setCyberConnect(_cyberConnect);
  }, []);

  const connectWallet = React.useCallback(async () => {
    try {
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions: {},
      });

      const web3instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(web3instance);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const ens = await provider.lookupAddress(address);

      setAddress(address);
      setEns(ens);
      _initCyberConnect(provider);

    } catch (err) {
      alert("Error: connectWallet");
      throw err;
    }
  }, [_initCyberConnect]);

  return (
    <CCContext.Provider
      value={{
        connectWallet,
        address,
        ens,
        cyberConnect,
      }}
    >
      {children}
    </CCContext.Provider>
  );
};

