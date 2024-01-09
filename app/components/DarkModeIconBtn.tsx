"use client";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../GlobalRedux/Features/darkMode/darkMode-slice";
import { AppDispatch, useAppSelectore } from "../GlobalRedux/store";


const DarkModeIconBtn = () => {
  const thememode = useAppSelectore((state) => state.darkModeReducer.mode);

  const dispatch = useDispatch<AppDispatch>();

  const onClickToggle = () => { // when the user clicks on this btn then run toggleDarkMode-function
    dispatch(toggleDarkMode());
  };

  return (
    <IconButton
      color="primary"
      aria-label="add to shopping cart"
      onClick={onClickToggle}
    >
      {thememode === "light" ? <WbSunnyIcon /> : <NightsStayIcon />}
    </IconButton>
  );
};

export default DarkModeIconBtn;
