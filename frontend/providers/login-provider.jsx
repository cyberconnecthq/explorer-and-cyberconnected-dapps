/**
 * 
 */

import React, { useState, useEffect, useContext, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import useWallet from "./wallet-provider";
import { domain } from "../lib/bip39";
import { LOG_IN, LOG_OUT } from "../redux/actions";

const URL = process.env.REACT_APP_BACKEND_URL;

const _defaultUser = { isLogined: false };
const _context = React.createContext({
  login: async () => undefined,
  logout: () => undefined,
  token: "",
  user: _defaultUser,
  isLogined: false,
  isLoading: false,
});

const useLogin = () => {
  return useContext(_context);
};
export default useLogin;

export const LoginProvider = ({ children }) => {
  const { address, connectWallet } = useWallet();
  const dispatch = useDispatch();
  const { isLogined, user, token } = useSelector((state) => {
    return state.session.login;
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const logout = useCallback(() => {
    setLoading(false);
    dispatch({
      type: LOG_OUT,
    });
    dispatch({ type: LOG_OUT });
  }, []);

  const login = useCallback(async () => {
    if (isLogined || isLoading) {
      return;
    }

    try {
      setLoading(true);
      const { address, signer } = await connectWallet();
      if (!address || !signer) {
        return;
      }

      const _register = async (uid) => {
        return fetch(`${URL}/api/user/add`, {
          body: JSON.stringify({
            uid,
            domain: domain(uid),
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
          const SIGN_MSG = `CCTwitter Login: ${nonce}`;
          const signature = await signer.signMessage(
            SIGN_MSG,
            address,
            "" // MetaMask will ignore the password argument here
          );
          return { uid, signature };
        } catch (err) {
          console.error(err);
          throw new Error("You cancelled sign or Error occured.");
        }
      };

      const _auth = async ({ uid, signature }) => {
        return fetch(`${URL}/api/user/auth`, {
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

      const uid = address.substring(2).toUpperCase();

      //addUser or getUser and  get nonce from server by uid(publicAddress)

      fetch(`${URL}/api/user/add`, {
        body: JSON.stringify({
          uid,
          domain: domain(uid),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }) /*
        .then((response) => {
          let users = response.json();
          return users;
        })
        .then(async (users) => {
          return users.length ? users[0] : _register(uid);
        })*/
        .then((response) => {
          if (response.ok) {
            let res = response.json(); //promise
            return res;
          } else {
            throw new Error(`Add Error!`);
          }
        })
        .then((res) => {
          console.log(res.user)
          return _signNonceMessage(res.user);
        })
        .then(({ uid, signature }) => {
          return _auth({ uid, signature });
        })
        .then(async (res) => {
          //onLogin
          setLoading(false);
          dispatch({
            type: LOG_IN,
            payload: { token: res.user.token, user: res.user },
          });
          //followList
          //...
        })
        .catch((err) => {
          window.alert(err);
        });
    } catch (err) {
      alert("Error: login");
      //logout();
      throw err;
    } finally {
      setLoading(false);
    }
  }, [address, isLogined, isLoading]);

  useEffect(() => {
    if (!isLogined) {
      document.title = "CCTwitter";
    } else {
      document.title = "@" + user.domain + "/CCTwitter";
    }
  }, [isLogined, user]);

  const { Provider } = _context;

  return (
    <Provider
      value={{
        user,
        token,
        login,
        logout,
        isLogined,
        isLoading,
      }}
    >
      {children}
    </Provider>
  );
};
