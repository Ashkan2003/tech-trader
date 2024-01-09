"use client";

import { useState } from "react";
import { logIn, logOut } from "./GlobalRedux/Features/auth/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./GlobalRedux/store";

export default function LogIn() {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const onClickLogIn = () => {
    dispatch(logIn(username));
  };

  const onClickToggle = () => {};

  const onClickLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <br></br>
      <button onClick={onClickLogIn}>Log In</button>
      <br></br>
      <button onClick={onClickLogOut}>Log Out</button>

      <button>Toggle Moderator</button>
    </div>
  );
}
