import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow"
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCarbin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;  
  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCarbin,
    onSuccess: () => {
      toast.success("Tạo mới Carbin thành công");
      queryClient.invalidateQueries({
        queryKey: ["carbins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(formData) {
    mutate({...formData, image: formData.image[0]});
  }

  function onError(errors) {
    
  }
  
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow lable="Tên carbin" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Trường này là bắt buộc",
          })}
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
            validate: (value) => Number.parseFloat(value) < Number.parseFloat(getValues().regularPrice) || 'Giá khuyến mãi phải nhỏ hơn giá bán',
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow lable="Mô tả hiển thị trên website" error={errors?.description?.message}>
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Trường này là bắt buộc"
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow lable="Ảnh phòng" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image")}/>
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Hủy 
        </Button>
        <Button disabled={isCreating || Object.keys(errors).length > 0}>Lưu</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
