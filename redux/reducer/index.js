import { combineReducers } from "@reduxjs/toolkit";
import { workerReducer } from "./woker";
import { skillsReducer } from "./skill";

const rootReducer = combineReducers({
  workerReducer,
  skillsReducer,
});

export default rootReducer;
