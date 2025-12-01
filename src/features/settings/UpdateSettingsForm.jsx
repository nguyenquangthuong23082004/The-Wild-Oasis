import useEditSetting from "./useEditSetting";
import useSettings from "./useSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useEditSetting();

  function handleUpadte(e, field) {
    const { value } = e.target;

    if (!value) {
      return;
    }

    updateSetting({ [field]: value });
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Form>
      <FormRow lable="Số đêm đặt tối thiểu">
        <Input
          type="number"
          id="min-nights"
          defaultValue={settings?.minBookingLength}
          onBlur={(e) => handleUpadte(e, "minBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow lable="Số đêm đặt tối đa">
        <Input
          type="number" 
          id="max-nights"
          defaultValue={settings?.maxBookingLength}
          onBlur={(e) => handleUpadte(e, "maxBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow lable="Số khách tối đa mỗi lượt đặt">
        <Input
          type="number"
          id="max-guests"
          defaultValue={settings?.maxGuestsPerBooking}
          onBlur={(e) => handleUpadte(e, "maxGuestsPerBooking")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow lable="Giá bữa sáng">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settings?.breakfastPrice}
          onBlur={(e) => handleUpadte(e, "breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
