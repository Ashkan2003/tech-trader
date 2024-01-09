"use client"; // for the redux
import {} from "react-redux";
import BasicButtons from "./components/Buttons";
import Navbar from "./components/Navbar";
import LogIn from "./log-in";
import { useAppSelectore } from "./GlobalRedux/store";

export default function Home() {
  const username = useAppSelectore((state) => state.authReducer.value.username);
  const mode = useAppSelectore((state) => state.darkModeReducer.mode);
  console.log(mode,"ffffff")
  return (
    <>
      <Navbar />
      <BasicButtons />
      <LogIn />
      <h1 className="text-black">username:{username}</h1>
    </>
  );
}
