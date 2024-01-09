"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/auth/auth-slice";
import darkModeReducer from "./Features/darkMode/darkMode-slice"
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    authReducer,
    darkModeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelectore: TypedUseSelectorHook<RootState> = useSelector;
