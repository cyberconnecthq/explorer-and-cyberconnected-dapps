import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import session from "redux-persist/lib/storage/session";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import updateReducer from "./reducers/update";
import themeReducer from "./reducers/theme";
//import userReducer from "./reducers/user";
import loginReducer from "./reducers/login";

const persistConfig = {
  key: "root",
  blacklist: ["form"],
  //white: ["form"],
  storage: session, //storage,
};

/*
const appReducer = persistReducer(
  persistConfig,
  combineReducers({
    update: updateReducer,
    theme: themeReducer,
    login: loginReducer,
    form: formReducer,
  })
);*/

const appReducer = combineReducers({
  volatile:combineReducers({
    update: updateReducer,
  }),
  session: persistReducer(
    persistConfig,
    combineReducers({
      theme: themeReducer,
      login: loginReducer,
      //form: formReducer,
    })
  ),
  //persist:
});

export const store = createStore(
  appReducer
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
