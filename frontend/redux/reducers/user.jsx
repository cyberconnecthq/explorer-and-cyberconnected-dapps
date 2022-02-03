import { LOG_IN, LOG_OUT } from "../actions";

const defaultUser = { isLogined: false };

const userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, ...action.payload, isLogined: true };
    case LOG_OUT:
      return defaultUser;
    default:
      return state;
  }
};

export default userReducer;
