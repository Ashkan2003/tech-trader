"use client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSymbols } from "../features/reactQuerySymbols/useSymbols";
import { Skeleton, Stack } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../GlobalRedux/store";
import { updateMainSearchBarSymbol } from "../GlobalRedux/Features/tableSymbols/tableSymbols-slice";

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
    <div className="ps-4 ">
      <Autocomplete
        onChange={(event, value: any) => {
          dispatch(updateMainSearchBarSymbol(value));
        }}
        className="bg-[#ffff] dark:bg-[#39566b]"
        disablePortal
        id="combo-box-demo"
        size="small"
        options={optionSymbols!}
        sx={{
          width: 500,
          color: "secondary",
          bgcolor: "",
          borderRadius: "5px",
        }}
        renderInput={(params) => <TextField {...params} label="جستجوی نماد" />}
      />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
