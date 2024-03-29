import { useFormik } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import Button from "./Button";
import Error from "./Error";
import Select from "./Select";
import TextInput from "./TextInput";
import { Destination } from "../models/Destination";

interface DestinationFormProps {
  initialValues?: Destination;
  onSubmit: (values: any) => Promise<void>;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  latitude: Yup.number().required("Latitude is required"),
  longitude: Yup.number().required("Longitude is required"),
  visibility: Yup.string().oneOf(["public", "private"]).required(),
  is_reviewed: Yup.bool().required(),
});

const defaultValues: Destination = {
  visibility: "public",
  is_reviewed: false,
  name: "",
  latitude: 0,
  longitude: 0,
};

const DestinationForm: FC<DestinationFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const usedInitialValues = initialValues ?? defaultValues;
  const formik = useFormik({
    initialValues: usedInitialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="block font-medium">
        Name
        <TextInput id="name" type="text" {...formik.getFieldProps("name")} />
      </label>
      <Error error={formik.errors.name} />

      <label className="block font-medium">
        Latitude
        <TextInput
          id="latitude"
          type="number"
          {...formik.getFieldProps("latitude")}
        />
      </label>
      <Error error={formik.errors.latitude} />

      <label className="block font-medium">
        Longitude
        <TextInput
          id="longitude"
          type="number"
          {...formik.getFieldProps("longitude")}
        />
      </label>
      <Error error={formik.errors.longitude} />

      <label className="block font-medium">
        Visibility
        <Select id="visibility" {...formik.getFieldProps("visibility")}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </Select>
      </label>

      {!usedInitialValues.is_reviewed && (
        <label className="block font-medium">
          Reviewed destination
          <input
            id="reviewed"
            type="checkbox"
            checked={formik.values.is_reviewed}
            {...formik.getFieldProps("is_reviewed")}
          />
        </label>
      )}

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default DestinationForm;
