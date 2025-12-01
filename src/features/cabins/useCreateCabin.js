import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCarbin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: creatCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCarbin,
    onSuccess: () => {
      toast.success("Tạo mới Carbin thành công");
      queryClient.invalidateQueries({
        queryKey: ["carbins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { creatCabin, isCreating };
}
export default useCreateCabin;
