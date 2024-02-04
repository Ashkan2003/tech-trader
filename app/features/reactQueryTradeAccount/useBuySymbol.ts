import { UserBoughtSymbol } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

// this is a custom-hook for setting up react-query for deleting a single-watchList
export const useBuySymbol = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: {
      currentTradeAccountId: number;
      currentBoughtSymbol: UserBoughtSymbol;
      newboughtSymbolName: string;
      newboughtSymbolCount: number;
      userNewProperty: number;
    }) => {
      // becuse the endpoint-request is "upsert" so we used "put" inisted of the "patch"
      return axios.put("/api/currentUserTradeAccount", data);
    },
    onSuccess: () => {
      toast.success("سفارش خرید شما با موفقیت ثبت شد.");
      queryClient.invalidateQueries({ queryKey: ["userTradeAccount"] });
      queryClient.invalidateQueries({ queryKey: ["symbols"] });
    },
    onError: (error) => {
      toast.error("در ثبت سفارش خطایی رخ داد.");
      console.log(error);
    },
  });
  return { mutate };
};
