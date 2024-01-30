"use client";
import {
  Typography,
  IconButton,
  Divider,
  Skeleton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { useState } from "react";

// this component is for rendering the Auth-state of the user in the navbar such as login, signup, logout and user-avatar
const NavAuthState = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // this is for the menu-component
  const { status, data: session } = useSession(); // the useSession hook is for geting user  authstatus in the client

  // console.log(session,"ggg")
  if (status == "loading")
    return (
      <div className="flex items-center ps-3">
        <Skeleton variant="rounded" width={120} height={40} />
        <Skeleton variant="circular" width={35} height={35} />
      </div>
    );
    
  // this is for the menu-component
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="flex items-center sm:ps-3">
        <Typography color="white" className="hidden sm:block">
          {session ? session!.user?.name : "name"}
        </Typography>
        <Link href="/">
          <IconButton onClick={handleClick} size="large">
            <SettingsSuggestOutlinedIcon
              fontSize="inherit"
              color="secondary"
            ></SettingsSuggestOutlinedIcon>
          </IconButton>
        </Link>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>{session?.user?.email}</MenuItem>
          <MenuItem onClick={handleClose}>{session?.user?.name}</MenuItem>
        </Menu>
      </div>
      <Divider orientation="vertical" flexItem />
      <Link href="/api/auth/signout">
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
