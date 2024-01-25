import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  // we need to define the types of our initialStates
  mode: "light" | "dark";
}

const initialState: InitialState = {
  mode: "dark",
};

export const darkMode = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleDarkMode } = darkMode.actions;
export default darkMode.reducer;
