import { useFormik } from "formik";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Error from "../../../components/Error";
import Layout from "../../../components/Layout";
import TextInput from "../../../components/TextInput";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireEmployee } from "../../../lib/hooks/useRole";

interface TripInfoFormProps {
  destinationId: number;
}

interface TripDates {
  start_date: Date;
  end_date: Date;
}

const validationSchema = Yup.object({
  start_date: Yup.date()
    .min(new Date(), "Start date must be in the future")
    .required("Start date is required"),
  end_date: Yup.date()
    .min(Yup.ref("start_date"), "End date must be after the start date")
    .required("End date is required"),
});

const TripInfoForm: FC<TripInfoFormProps> = ({ destinationId }) => {
  const [error, setError] = useState("");
  const axios = useAxios();
  const navigate = useNavigate();
  const { data: destination } = useQuery<Destination>(
    ["employee", "destinations", destinationId],
    () => axios.get(`/employee/destinations/${destinationId}`).then(d => d.data)
  );

  const onSubmit = async (values: TripDates) => {
    try {
      const start_date = new Date(values.start_date)
        .toISOString()
        .split(".")[0];
      const end_date = new Date(values.end_date).toISOString().split(".")[0];

      await axios.post(`/employee/bucketlist-items/add/from-available`, {
        destination_id: destinationId,
        start_date,
        end_date,
      });
      //   TODO: redirect to own bucketlist overview
      navigate("/destinations");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const formik = useFormik({
    initialValues: { start_date: new Date(), end_date: new Date() },
    onSubmit,
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
          End date&nbsp;
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

const AddDestinationToBucketListPage = () => {
  useRequireEmployee();
  const { destinationId } = useParams();

  return (
    <Layout title="Add bucket list destination">
      <Card>
        <h2 className="text-2xl font-semibold mb-6">
          Add destination to bucket list
        </h2>
        <TripInfoForm destinationId={Number(destinationId)} />
      </Card>
    </Layout>
  );
};

export default AddDestinationToBucketListPage;
