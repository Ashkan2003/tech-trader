import { UserBoughtSymbol } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

// this is a custom-hook for setting up react-query for deleting a single-watchList
export const useSaleSymbol = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: {
      userNewProperty: number;
      symbolSaleCount: number;
      saledSymbolName: string;
      currentTradeAccountId: number;
      currentSaledSymbol: UserBoughtSymbol;
    }) => {
      return axios.delete("/api/currentUserTradeAccount", { data });
    },
    onSuccess: () => {
      toast.success("سفارش فروش شما با موفقیت ثبت شد.");
      queryClient.invalidateQueries({ queryKey: ["userTradeAccount"] });
      queryClient.invalidateQueries({ queryKey: ["symbols"] });
    },
    onError: (error) => {
      toast.error("در ثبت سفارش فروش خطایی رخ داد.");
      console.log(error);
    },
  });
  return { mutate };
};
