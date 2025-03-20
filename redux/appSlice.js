import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedApp: null, // Default value
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedApp: (state, action) => {
      state.selectedApp = action.payload;
    },
  },
});

export const { setSelectedApp } = appSlice.actions;
export default appSlice.reducer;
