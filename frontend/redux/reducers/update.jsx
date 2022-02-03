import { SET_UPDATE } from "../actions";

const initialState = {
  refresh: false,
};

const updateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UPDATE:
      return {
        refresh: !state.refresh,
      };
    default:
      return state;
  }
};

export default updateReducer;
