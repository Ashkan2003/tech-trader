"use client";

import { Typography } from "@mui/material";
import { useUserTradeAccount } from "@/app/features/reactQueryTradeAccount/useUserTradeAccount";

const UserProperty = () => {
  const { userTradeAccount, isLoading, error } = useUserTradeAccount();

  if(isLoading) return null
    console.log(userTradeAccount.at(0).tradeAccount.userProperty,"ddddddd")
    console.log(userTradeAccount,"ddggd")
  return (
    <div className=" px-4 hidden md:flex">
      <Typography className="text-white">مانده قابل معامله:</Typography>
      <Typography className="text-yellow-300 ps-1">{userTradeAccount.at(0).tradeAccount.userProperty} ریال</Typography>
    </div>
  );
};

export default UserProperty;
