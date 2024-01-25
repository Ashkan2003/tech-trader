import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

// this is a custom-hook for setting up react-query for creating a single-watchList
export const useCreateWatchList = () => {

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (watchTitle: string) => {
      return axios.post("/api/watchLists", { watchTitle });
    },
    onSuccess: () => {
      toast.success("دیده بان جدید با موفقیت ایجاد شد.");
      queryClient.invalidateQueries({queryKey:["watchLists"]})
    },
    onError: (error) => {
      toast.error("خطایی رخ داد.");
      console.log(error);
    },
  });
  return { mutate };
};
