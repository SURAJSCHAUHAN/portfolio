import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice"; // Import reducers

export const store = configureStore({
  reducer: {
    app: appReducer
  },
});
