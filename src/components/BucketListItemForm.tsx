import { useFormik } from "formik";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import * as Yup from "yup";
import useAxios from "../lib/hooks/useAxios";
import Button from "./Button";
import Error from "./Error";
import TextInput from "./TextInput";

export interface TripDates {
  start_date: Date;
  end_date: Date;
}

interface BucketListItemFormProps {
  destinationId: number;
  onSubmit: (values: TripDates) => Promise<void>;
  initialValues: TripDates;
}

const validationSchema = Yup.object({
  start_date: Yup.date()
    .min(new Date(), "Start date must be in the future")
    .required("Start date is required"),
  end_date: Yup.date()
    .min(Yup.ref("start_date"), "End date must be after the start date")
    .required("End date is required"),
});

const BucketListItemForm: FC<BucketListItemFormProps> = ({
  destinationId,
  onSubmit,
  initialValues,
}) => {
  const [error, setError] = useState("");
  const axios = useAxios();
  const { data: destination } = useQuery<Destination>(
    ["employee", "destinations", destinationId],
    () => axios.get(`/employee/destinations/${destinationId}`).then(d => d.data)
  );

  const formik = useFormik({
    initialValues,
    onSubmit: async (values: TripDates) => {
      try {
        await onSubmit(values);
      } catch (error: any) {
        setError(error.message);
      }
    },
    validationSchema,
  });

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">{destination?.name}</h2>
      <form onSubmit={formik.handleSubmit}>
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
        <Error
          error={formik.errors.end_date && String(formik.errors.end_date)}
        />

        <Error error={error} />

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default BucketListItemForm;
