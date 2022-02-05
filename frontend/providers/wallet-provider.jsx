import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const _context = React.createContext({
  address: "",
  connectWallet: () => undefined,
});

const useWallet = () => {
  return useContext(_context);
};
export default useWallet;

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions: {},
      });
      const web3instance = await web3Modal.connect();
      const _provider = new ethers.providers.Web3Provider(web3instance);

      const _signer = _provider.getSigner();
      const _address = await _signer.getAddress();
      setProvider(_provider);
      setSigner(_signer);
      setAddress(_address);
      return { provider: _provider, signer: _signer, address: _address };
    } catch (err) {
      alert("Error: wallet connect. Did you installed MetaMask extesion?");
      console.error(err);
      throw err;
    }
    return { provider, signer, address };
    console.info(address);
  };

  const { Provider } = _context;

  return (
    <Provider
      value={{
        address,
        connectWallet,
      }}
    >
      {children}
    </Provider>
  );
};
