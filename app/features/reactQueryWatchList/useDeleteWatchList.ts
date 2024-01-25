import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useDeleteWatchList = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (currentId: number) => {
      return axios.delete("/api/watchLists", { data: currentId });
    },
    onSuccess: () => {
      toast.success("دیده بان مورد نظر حذف گردید.");
      queryClient.invalidateQueries({ queryKey: ["watchLists"] });
    },
    onError: (error) => {
      toast.error("خطایی رخ داد.");
      console.log(error);
    },
  });
  return { mutate };
};
