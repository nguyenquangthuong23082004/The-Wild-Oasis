import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCarbin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingCarbin, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("Carbin đã xóa thành công");
      queryClient.invalidateQueries({
        queryKey: ["carbins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeletingCarbin, deleteCabin };
}

export default useDeleteCabin;
