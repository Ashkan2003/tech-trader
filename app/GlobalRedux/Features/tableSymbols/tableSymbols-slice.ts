import { Symbols } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type mode = "userWatchList" | "techTraderWatchList" | "mainSearchBarSymbol";

interface InitialState {
  currentShowMode: mode;
  reduxSymbols: string;
}

const initialState: InitialState = {
  currentShowMode: "techTraderWatchList", // we want to know, witch symbols to show in MainTable-component 
  reduxSymbols: "", // this is for the symbols that the user selected in his watchList
};

export const tableSymbols = createSlice({
  name: "tableSymbols",
  initialState,
  reducers: {
    updateReduxSymbols: (state, action: PayloadAction<string>) => {
      state.currentShowMode = "userWatchList"; // so if this reducer is fired, it means that the user selected one of its watchList,so change the mode to "userWatchList" 
      state.reduxSymbols = action.payload;
    },
    updateCurrentShowedMode: (state, action: PayloadAction<mode>) => {
      state.currentShowMode = action.payload;
    },
  },
});

export const { updateReduxSymbols,updateCurrentShowedMode } = tableSymbols.actions;
export default tableSymbols.reducer;
