import { SET_UPDATE } from "../actions";

const initialState = {
  refresh: 0,
};

const updateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UPDATE:
      return {
        refresh: state.refresh + 1,
      };
    default:
      return state;
  }
};

export default updateReducer;
