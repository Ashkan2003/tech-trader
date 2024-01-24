import { Symbols, WatchList } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// this is a custom-hook for fetching the symbols from db with reactQuery and axios
export const useUserWatchLists = () => {
  const {
    data: watchLists,
    isLoading,
    error,
  } = useQuery<WatchList[]>({
    queryKey: ["watchLists"], // the queryKey is a unic key to identify the data in the cash
    queryFn: async () =>
      await axios.get("/api/watchLists").then((res) => res.data), // we pass a function to this to fetch the data
  });
  return { watchLists, isLoading, error };
};
