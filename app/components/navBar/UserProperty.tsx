"use client";

import { Skeleton, Typography } from "@mui/material";
import { useUserTradeAccount } from "@/app/features/reactQueryTradeAccount/useUserTradeAccount";

const UserProperty = () => {
  
  const { userTradeAccount, isLoadingTradeAccount, error } = useUserTradeAccount();
  return (
    <div className=" px-4 hidden md:flex items-center">
      <Typography className="text-white">مانده قابل معامله:</Typography>
      {isLoadingTradeAccount ? (
        <Skeleton sx={{marginLeft:"10px"}} width="80px" height="50px" />
      ) : (
        <Typography className="text-yellow-300 ps-1">
          {userTradeAccount?.userProperty} ریال
        </Typography>
      )}
    </div>
  );
};

export default UserProperty;
