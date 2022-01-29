import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import session from "redux-persist/lib/storage/session";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import userReducer from "./reducers/user";
import updateReducer from "./reducers/update";
import themeReducer from "./reducers/theme";

const persistConfig = {
  key: "root",
  blacklist: ["form"],
  //white: ["form"],
  //storage: storage,
  storage: session,
};

const appReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    update: updateReducer,
    theme: themeReducer,
    form: formReducer,
  })
);

const store = createStore(
  appReducer,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/*
const store = createStore(appReducer);
*/
const persistor = persistStore(store);

export default { store, persistor };
