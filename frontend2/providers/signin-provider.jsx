import React, { useState, useEffect, useContext, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import useWallet from "./wallet-provider";
import { LOG_IN, LOG_OUT } from "../redux/actions";

const _defaultUser = { isLogined: false };
const _context = React.createContext({
  login: async () => undefined,
  logout: () => undefined,
  user: _defaultUser,
  isLogined: false,
  isLoading: false,
});

const useWLogin = () => {
  return useContext(_context);
};
export default useWLogin;

export const WLoginProvider = ({ children }) => {
  const { address, signer, connect, provider } = useWallet();
  const storedUser = useSelector((state) => state.user);
  const [user, setUser] = useState(storedUser);
  const [isLogined, setLogined] = useState(!!user.isLogined);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    setLoading(false);
    setLogined(false);
    setUser(_defaultUser);
    dispatch({ type: LOG_OUT });
  }, []);

  const login = useCallback(() => {
    console.log("login");
    const _f = async () => {
      try {
        await connect();
      } catch (err) {
        alert("Error: login");
        console.error(err);
        logout();
        return;
      }
    };
    _f();
  }, []);

  useEffect(() => {
    const _f = async () => {

      console.log("effect")
      if (!provider || !signer) {
        //? alert("Error: no provider");
        //logout();
        return;
      }
      if(isLogined || isLoading){
        return;
      }
      console.log("start login")

      try {
        setLoading(true);
        const uid = address.substring(2).toUpperCase();
        //backbone of auth with metamask.
        // find existing user by id(publicAddress)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/get?uid=${uid}`)
          .then((response) => {
            let users = response.json();
            return users;
          })
          .then(async (users) => {
            return users.length ? users[0] : _register(uid);
          })
          .then(async (user) => {
            return _signNonceMessage(user);
          })
          .then(({ uid, signature }) => {
            return _auth({ uid, signature });
          })
          .then(async (res) => {
            //onLogin
            setLoading(false);
            setUser(res.user);
            dispatch({ type: LOG_IN, payload: res.user });
            setLogined(true);
            //followList
            //...
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
    };
    _f();

    const _register = async (uid) => {
      return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/add`, {
        body: JSON.stringify({
          uid,
          username: shortName(uid),
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
        const SIGN_MSG = `CyberConnect Twitter Login : ${nonce}`;
        const signature = await signer.signMessage(
          SIGN_MSG,
          "0x" + uid,
          "" // MetaMask will ignore the password argument here
        );
        return { uid, signature };
      } catch (err) {
        console.error(err);
        throw new Error("You cancelled sign or Error occured.");
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
        if (response.ok) {
          let res = response.json(); //promise
          return res;
        } else {
          throw new Error(`Auth Error!`);
        }
      });
    };
  }, [provider, signer, address]);

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
