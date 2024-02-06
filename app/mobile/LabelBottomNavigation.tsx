"use client";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Paper } from "@mui/material";
import Link from "next/link";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import AddchartIcon from "@mui/icons-material/Addchart";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LabelBottomNavigation() {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClick = (href: string) => {
    router.push(href);
  };

  const links = [
    {
      lable: "دیدبان",
      href: "/mobile/mobileMainTable",
      icon: <AddchartIcon color="info" />,
    },
    {
      lable: "نماد",
      href: "/mobile/mobileSymbolInfo",
      icon: <TroubleshootIcon color="info" />,
    },
    {
      lable: "دارایی",
      href: "/mobile/mobileUserProperty",
      icon: <DonutSmallIcon color="info" />,
    },
    {
      lable: "داشبورد",
      href: "/mobile/mobileUserProperty",
      icon: <DonutSmallIcon color="info" />,
    },
  ];

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ bgcolor: "lemon.main" }}
        value={value}
        onChange={handleChange}
      >
        {links.map((item, index) => (
          <BottomNavigationAction
            sx={{ ".MuiBottomNavigationAction-label": { color: "#9095c6" } }}
            key={index}
            onClick={() => handleClick(item.href)}
            label={item.lable}
            value={index}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
