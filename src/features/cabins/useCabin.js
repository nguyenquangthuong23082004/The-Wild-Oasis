import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabin() {
  const {
    isLoading,
    data: carbins,
    error,
  } = useQuery({
    queryKey: ["carbins"],
    queryFn: getCabins,
  });
  return { isLoading, error, carbins };
}

export default useCabin;
