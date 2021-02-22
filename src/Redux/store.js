import { createStore, applyMiddleware } from "redux";
import Reducers from "./RootReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const middleWares = [thunk];

const Store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(...middleWares))
);

export default Store;
