import { SET_USER, LOGOUT_USER } from "../actions";

const initialState = {
 
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};

export default userReducer;
