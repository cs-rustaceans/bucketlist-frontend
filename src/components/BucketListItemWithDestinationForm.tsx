import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Button from "./Button";
import Error from "./Error";
import TextInput from "./TextInput";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  latitude: Yup.number().required("Latitude is required"),
  longitude: Yup.number().required("Longitude is required"),
  start_date: Yup.date()
    .min(new Date(), "Start date must be in the future")
    .required("Start date is required"),
  end_date: Yup.date()
    .min(Yup.ref("start_date"), "End date must be after the start date")
    .required("End date is required"),
});

const BucketListItemWithDestination = ({
  onSubmit,
}: {
  onSubmit: (values: any) => Promise<void>;
}) => {
  const [error, setError] = useState("");
  const initialValues = {
    name: "",
    latitude: 0,
    longitude: 0,
    start_date: new Date(),
    end_date: new Date(),
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values: any) => {
      try {
        onSubmit(values);
      } catch (error: any) {
        setError(error.message);
      }
    },
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
        Start date
        <TextInput type="date" {...formik.getFieldProps("start_date")} />
      </label>
      <Error
        error={formik.errors.start_date && String(formik.errors.start_date)}
      />

      <label className="block font-medium">
        End date
        <TextInput type="date" {...formik.getFieldProps("end_date")} />
      </label>
      <Error error={formik.errors.end_date && String(formik.errors.end_date)} />

      <Error error={error} />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default BucketListItemWithDestination;
