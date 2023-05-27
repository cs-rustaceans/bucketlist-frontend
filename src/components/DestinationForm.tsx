import { useFormik } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import Button from "./Button";
import Error from "./Error";
import Select from "./Select";
import TextInput from "./TextInput";

interface DestinationFormProps {
  onSubmit: (values: any) => Promise<void>;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  latitude: Yup.number().required("Latitude is required"),
  longitude: Yup.number().required("Longitude is required"),
  visibility: Yup.string().oneOf(["public", "private"]).required(),
  is_reviewed: Yup.bool().required(),
});

const DestinationForm: FC<DestinationFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      visibility: "public",
      is_reviewed: false,
      name: "",
      latitude: 0,
      longitude: 0,
    },
    onSubmit,
    validationSchema,
  });

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
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
        Is reviewed
        <input
          id="reviewed"
          type="checkbox"
          {...formik.getFieldProps("is_reviewed")}
        />
      </label>

      <label className="block font-medium">
        Visibility
        <Select id="visibility" {...formik.getFieldProps("visibility")}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </Select>
      </label>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default DestinationForm;
