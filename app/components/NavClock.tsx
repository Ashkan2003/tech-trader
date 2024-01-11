"use client";
import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LaptopTwoToneIcon from "@mui/icons-material/LaptopTwoTone";

const NavClock = () => {
  const [hour, setHour] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      const currentDate = new Date();
      setHour(() => currentDate.getHours());
      setMinutes(() => currentDate.getMinutes());
      setSeconds(() => currentDate.getSeconds());
    }, 1000);
  }, []);

  return (
    <div className="flex items-center ps-3">
      <Typography fontWeight="bold" color="white">
        {hour <= 9 ? "0" + hour : hour}:{minutes <= 9 ? "0" + minutes : minutes}
        :{seconds <= 9 ? "0" + seconds : seconds}
      </Typography>
      <IconButton size="large">
        <LaptopTwoToneIcon fontSize="inherit" color="secondary" />
      </IconButton>
    </div>
  );
};

export default NavClock;
