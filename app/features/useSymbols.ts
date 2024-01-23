import { Symbols } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// this is a custom-hook for fetching the symbols from db with reactQuery and axios
export const useSymbols = () => {
  const {
    data: sybmols,
    isLoading,
    error,
  } = useQuery<Symbols[]>({
    queryKey: ["symbols"], // the queryKey is a unic key to identify the data in the cash
    queryFn: async () =>
      await axios.get("/api/symbols").then((res) => res.data), // we pass a function to this to fetch the data
    
  });
  return { sybmols, isLoading, error };
};
