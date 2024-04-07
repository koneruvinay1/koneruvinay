import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/reducer";

const middleware = [thunk];
let devtools, store;
const isClient = typeof window !== "undefined";
if (isClient) {
  // devtools =
  //   process.browser && window.__REDUX_DEVTOOLS_EXTENSION__
  //     ?
  //       window.__REDUX_DEVTOOLS_EXTENSION__()
  //     : (f) => f;

  devtools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

  const { persistStore, persistReducer } = require("redux-persist");
  const storage = require("redux-persist/lib/storage").default;
  const persistConfig = {
    key: "gromacity",
    storage,
  };

  store = createStore(
    persistReducer(persistConfig, rootReducer),
    compose(applyMiddleware(...middleware), devtools)
  );

  store.__PERSISTOR = persistStore(store);
} else {
  store = createStore(rootReducer, compose(applyMiddleware(...middleware)));
}

export default store;
