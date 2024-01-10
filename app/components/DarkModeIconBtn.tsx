"use client";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../GlobalRedux/Features/darkMode/darkMode-slice";
import { AppDispatch, useAppSelectore } from "../GlobalRedux/store";
import { useEffect } from "react";


const DarkModeIconBtn = () => {
  const thememode = useAppSelectore((state) => state.darkModeReducer.mode);

  const dispatch = useDispatch<AppDispatch>();

  const onClickToggle = () => { // when the user clicks on this btn then run toggleDarkMode-function
    dispatch(toggleDarkMode());
  };


  // this part is for the tailwind css dark-mode
  useEffect(
    function () {
      if (thememode ==="dark") {
        document.documentElement.classList.add("dark"); // this is the tailwindCss darkmode functionality => when the html-tag(head html tag) have the class of "dark the "dark:"-variaty of the tailwindCss classes will activated
      } else {
        document.documentElement.classList.remove("dark"); //when we remove the "dark" class from the head html-tag the "dark:"-variaty of the tailwindCss classes will dectivated
      }
    },
    [thememode]
  );


  return (
    <IconButton
      color="secondary"
      aria-label="add to shopping cart"
      onClick={onClickToggle}
    >
      {thememode === "light" ? <WbSunnyIcon /> : <NightsStayIcon />}
    </IconButton>
  );
};

export default DarkModeIconBtn;
