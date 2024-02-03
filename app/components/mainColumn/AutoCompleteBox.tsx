"use client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSymbols } from "../../features/reactQuerySymbols/useSymbols";
import { Skeleton, Stack } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../GlobalRedux/store";
import { updateMainSearchBarSymbol } from "../../GlobalRedux/Features/tableSymbols/tableSymbols-slice";

export default function AutoCompleteBox() {
  const { isLoading, dataBaseSybmols } = useSymbols();
  const dispatch = useDispatch<AppDispatch>();

  if (isLoading)
    return (
      <Stack paddingLeft={2}>
        <Skeleton width="30rem" height="50px" />
      </Stack>
    );

  // we want the entire symbols-name to give them to the options-prperty of auto-compelte-box to show them to the user
  // the optionSymbols is an array of symbols-name
  const optionSymbols = dataBaseSybmols?.map((symbol) => {
    return symbol.symbolName;
  });

  return (
    <div>
      <Autocomplete
        onChange={(event, value: any) => {
          dispatch(updateMainSearchBarSymbol(value));
        }}
        className=" bg-[#ffff] dark:bg-[#39566b]"
        disablePortal
        id="combo-box-demo"
        size="small"
        options={optionSymbols!}
        sx={{
          color: "secondary",
          borderRadius: "5px",
          width: { xs:"280",md: "230px", lg: "400px" },
          display: {  sm: "none",md:"block" },
        }}
        renderInput={(params) => (
          <TextField color="info" {...params} label="جستجوی نماد" />
        )}
      />
    </div>
  );
}

