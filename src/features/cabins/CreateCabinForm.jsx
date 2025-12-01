import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCarbin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate: creatCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCarbin,
    onSuccess: () => {
      toast.success("Tạo mới Carbin thành công");
      queryClient.invalidateQueries({
        queryKey: ["carbins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCarbin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cập cập cabin thành công");
      queryClient.invalidateQueries({
        queryKey: ["carbins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;


  function onSubmit(formData) {
    const image = typeof formData.image === 'string' ? formData.image : formData.image[0]

    if (isEditSession) {
      editCabin({newCabinData:{...formData, image: image }, id: editId});
    } else{
      creatCabin({ ...formData, image: image });
    }
  }

  function onError(errors) {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow lable="Tên carbin" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Trường này là bắt buộc",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow lable="Sức chứa tối đa" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Trường này là bắt buộc",
            min: {
              value: "1",
              message: "Sức chứa phải lớn hơn hoặc bằng 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow lable="Giá tiêu chuẩn" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Trường này là bắt buộc",
            min: {
              value: "1",
              message: "Giá phải lớn hơn 0",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow lable="Giảm giá" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Trường này là bắt buộc",
            min: {
              value: "1",
              message: "Giá khuyến mãi phải lớn hơn 0",
            },
            validate: (value) =>
              Number.parseFloat(value) <
                Number.parseFloat(getValues().regularPrice) ||
              "Giá khuyến mãi phải nhỏ hơn giá bán",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        lable="Mô tả hiển thị trên website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Trường này là bắt buộc",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow lable="Ảnh phòng" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Trường ảnh là bắt buộc",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Hủy
        </Button>
        <Button disabled={isWorking}>Lưu</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
