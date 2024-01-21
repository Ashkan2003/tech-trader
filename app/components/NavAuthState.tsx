"use client";
import { Typography, IconButton, Divider, Skeleton } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";

const NavAuthState = () => {
  // this component is for rendering the Auth-state of the user in the navbar such as login, signup, logout and user-avatar
  const { status, data: session } = useSession(); // the useSession hook is for geting user  authstatus in the client

  if (status == "loading")
    return (
      <div className="flex items-center ps-3">
        <Skeleton variant="rounded" width={120} height={40} />
        <Skeleton variant="circular" width={35} height={35} />
      </div>
    );

  return (
    <>
      <div className="flex items-center ps-3">
        <Typography color="white" className="hidden sm:block">
          {session!.user?.name}
        </Typography>
        <Link href="/api/auth/signout">
          <IconButton size="large">
            <SettingsSuggestOutlinedIcon
              fontSize="inherit"
              color="secondary"
            ></SettingsSuggestOutlinedIcon>
          </IconButton>
        </Link>
      </div>
      <Divider orientation="vertical" flexItem />
      <Link href="/api/auth/signin">
        <IconButton size="large">
          <PowerSettingsNewRoundedIcon
            fontSize="inherit"
            sx={{ color: "yellow" }}
          ></PowerSettingsNewRoundedIcon>
        </IconButton>
      </Link>
    </>
  );
};

export default NavAuthState;
