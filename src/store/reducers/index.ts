import { combineReducers } from "redux";
import { counterReducer } from "./counter";
import { slotReducer } from "./slot";

export const rootReducer = combineReducers({
  counter: counterReducer,
  slot: slotReducer,
});
