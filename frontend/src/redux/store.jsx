import { combineReducers } from "redux";
import alertsSlice from "./alertsSlice";
import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";

const rootreducer = combineReducers({
  alerts: alertsSlice,
  users: usersSlice,
});

const store = configureStore({ reducer: rootreducer });

export default store;
