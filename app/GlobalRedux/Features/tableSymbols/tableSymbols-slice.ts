import { Symbols } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  reduxSymbols: string;
}

const initialState: InitialState = {
  reduxSymbols: "",
};

export const tableSymbols = createSlice({
  name: "tableSymbols",
  initialState,
  reducers: {
    updateReduxSymbols: (state, action: PayloadAction<string>) => {
        state.reduxSymbols = action.payload
    },
  },
});

export const {updateReduxSymbols} = tableSymbols.actions
export default tableSymbols.reducer