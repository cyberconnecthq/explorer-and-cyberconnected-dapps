import React, { useState, useEffect, useContext, useCallback } from "react";
import { shortName } from "../cyber-connect/bip39";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import useWallet from "../wallet/provider";
const _defaultUser = {};

const _context = React.createContext({
  login: async () => undefined,
  logout: () => undefined,
  user: _defaultUser,
  setUser: () => undefined,
  isLogined: false,
  isLoading: false,
});

const useWLogin = () => {
  return useContext(_context);
};
export default useWLogin;

export const WLoginProvider = ({ children }) => {
  const { address, signer, connect } = useWallet();
  const [user, setUser] = useState(_defaultUser);
  const [isLogined, setLogined] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const logout = useCallback(() => {
    setLoading(false);
    setLogined(false);
    setUser(_defaultUser);
  }, []);

  const login = useCallback(async () => {
    if(!singer){
      await connect();
    }
    if(!signer){
      alert("Error: login");
      logout();
    }
    try {
      setLoading(true);
      //mainframe for auth with metamask.
      // find existing user by id(publicAddress)
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/get?id=${accountUid}`
      )
        .then((response) => {
          let users = response.json();
          return users;
        })
        .then((users) => {
          return users.length ? users[0] : _register(accountUid);
        })
        .then(_signNonceMessage)
        .then(_auth)
        .then((res) => {
          //onLogin
          setUser(res.user);
          setLoading(false);
          //followList
        })
        .catch((err) => {
          window.alert(err);
          setLoading(false);
        });
    } catch (err) {
      alert("Error: login");
      logout();
      throw err;
    }

    const _register = async (accountUid) => {
      return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/add`, {
        body: JSON.stringify({
          uid: accountUid,
          username: shortName(accountUid),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("User Add Failed.");
        }
      });
    };

    const _signNonceMessage = async (_user) => {
      const { uid, nonce } = _user;
      try {
        const SIGN_MSG = `Walllet Login : ${nonce}`;
        //signer
        const signature = await signer.sign(
          SIGN_MSG,
          "0x" + uid,
          "" // MetaMask will ignore the password argument here
        );
        /*
        const signature = await web3.eth.personal.sign(
          SIGN_MSG,
          "0x" + uid,
          "" // MetaMask will ignore the password argument here
        );*/
        console.log(signature);
        return { uid, signature };
      } catch (err) {
        throw new Error("You cancelled sign or Sign Error occured.");
      }
    };

    const _auth = async ({ uid, signature }) => {
      return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/auth`, {
        body: JSON.stringify({ uid, signature }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then((response) => {
        console.log("auth");
        if (response.ok) {
          let res = response.json(); //promise
          return res;
        } else {
          throw new Error(`Auth Error!`);
        }
      });
    };
  }, []);

  if (isLoading === false) {
    if (user.uid) {
      setLogined(true);
    } else {
      setLogined(false);
    }
  }

  return (
    <_context.Provider
      value={{
        user,
        login,
        logout,
        isLogined,
        isLoading,
      }}
    >
      {children}
    </_context.Provider>
  );
};
