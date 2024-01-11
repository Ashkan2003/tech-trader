"use client";
import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { current } from "@reduxjs/toolkit";
const NavClock = () => {
  const [hour, setHour] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  //   const hour = currentDate.getHours();
  //   const minuets = currentDate.getMinutes();
  //   const seconds = currentDate.getSeconds();

  useEffect(() => {
    setInterval(() => {
      const currentDate = new Date();
      setHour(() => currentDate.getHours());
      setMinutes(() => currentDate.getMinutes());
      setSeconds(() => currentDate.getSeconds());
    }, 1000);
  }, []);

  return (
    <div className="flex items-center" suppressHydrationWarning>
      <Typography fontWeight="bold" color="white">
        {hour}:{minutes}:{seconds}
      </Typography>

      <IconButton>
        <AccessTimeIcon color="secondary" />
      </IconButton>
    </div>
  );
};

export default NavClock;
