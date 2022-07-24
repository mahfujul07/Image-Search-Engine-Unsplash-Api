import { createStore, combineReducers } from "redux";
import searchReducer from "./search";

const reducers = combineReducers({
  search: searchReducer,
});

const store = createStore(reducers);

export default store;
