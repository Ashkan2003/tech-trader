import { WatchList } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

// this is a custom-hook for setting up react-query for deleting a single-watchList
export const useUpdateWatchList = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: { id: number; title: string; symbols: string }) => {
      return axios.patch("/api/watchLists", data);
    },
    onSuccess: () => {
      toast.success("دیده بان مورد ویرایش گردید.");
      queryClient.invalidateQueries({ queryKey: ["watchLists"] });
    },
    onError: (error) => {
      toast.error("خطایی رخ داد.");
      console.log(error);
    },
  });
  return { mutate };
};
