import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCarbin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCarbin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cập cập cabin thành công");
      queryClient.invalidateQueries({
        queryKey: ["carbins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editCabin, isEditing };
}

export default useEditCabin;
