import React, { useState, useEffect, useContext, useCallback } from "react";
import Web3 from "web3";
import { shortName } from "../cc-utils/bip39";

let web3 = undefined;
const _defaultUser = {};

const _context = React.createContext({
  login: async () => undefined,
  logout: () => undefined,
  isLogined: false,
  isLoading: false,
  user: _defaultUser,
});

export const useUser = () => {
  return useContext(_context);
};


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(_defaultUser);
  const [isLogined, setLogined] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const logout = () => {
    setLoading(false);
    setLogined(false);
    setUser(_defaultUser);
  };

  const login = async () => {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      window.alert("Please install MetaMask first.");
      return;
    }

    if (!web3) {
      try {
        // Request account
        await window.ethereum.enable();
        web3 = new Web3(window.ethereum);
      } catch (error) {
        window.alert("You need to allow MetaMask.");
        return;
      }
    }

    let _accountAddress = await web3.eth.getCoinbase();
    if (!_accountAddress) {
      window.alert("Please activate MetaMask first.");
      return;
    }

    const accountUid = _accountAddress.substring(2).toUpperCase();
    setLoading(true);

    //mainframe for auth with metamask.
    // find existing user by id(publicAddress)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/get?id=${accountUid}`)
      .then((response) => {
        let users = response.json();
        return users;
      })
      .then((users) => {
        return users.length ? users[0] : _register(accountUid);
      })
      .then(_signNonceMessage)
      .then(_auth)
      .then(_onLoggedIn)
      .catch((err) => {
        window.alert(err);
        setLoading(false);
      });

    const _register = (accountUid) =>
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/add`, {
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

    const _signNonceMessage = async (_user) => {
      const { uid, nonce } = _user;
      try {
        const SIGN_MSG = `CyberConnect Twitter Login : ${nonce}`;
        const signature = await web3.eth.personal.sign(
          SIGN_MSG,
          "0x" + uid,
          "" // MetaMask will ignore the password argument here
        );
        console.log(signature);
        return { uid, signature };
      } catch (err) {
        throw new Error("You cancelled sign or Sign Error occured.");
      }
    };

    const _auth = ({ uid, signature }) =>
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/auth`, {
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

  const _onLoggedIn = (res) => {
    setUser(res.user);
    setLoading(false);
    setLogined(true);
  };

  return (
    <_context.Provider
      value={{
        login,
        logout,
        user,
        isLogined,
        isLoading,
      }}
    >
      {children}
    </_context.Provider>
  );
};
