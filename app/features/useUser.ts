import { Symbols, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// this is a custom-hook for fetching the symbols from db with reactQuery and axios
export const useUser = () => {
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["user"], // the queryKey is a unic key to identify the data in the cash
    queryFn: async () =>
      await axios.get("/api/currentUser").then((res) => res.data), // we pass a function to this to fetch the data
    
  });
  return { currentUser, isLoading, error };
};
