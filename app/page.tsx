"use client"; // for the redux
import {} from "react-redux";
import BasicButtons from "./components/Buttons";
import Navbar from "./components/Navbar";
import LogIn from "./log-in";
import { useAppSelectore } from "./GlobalRedux/store";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Home() {
  
  return (
    <>
      <Navbar />
      <BasicButtons />
      <LogIn />
     
     
    </>
  );
}
