/**
 * 
 */

import { LOG_IN, LOG_OUT } from "../actions";

const initialState = {
  isLogined: false,
  user: {
    address: "",
    uid: "",
    avarta: "",
    domain: "",
    shortAddress: "",
    followingCount:0,
    followerCount:0,
    followings:{
      list:[]
    },
    followers:{
      list:[]
    },
  },
  token: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        isLogined: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOG_OUT:
      return { isLogined: false };
    default:
      return state;
  }
};

export default loginReducer;
