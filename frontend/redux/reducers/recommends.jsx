/**
 * 
 */

import { SET_RECOMMENDS } from "../actions";

const initialState = { list: [], pageInfo: {} };

const recommendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECOMMENDS:
      return action.payload;
    default:
      return state;
  }
};

export default recommendsReducer;
