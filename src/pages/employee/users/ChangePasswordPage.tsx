import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Error from "../../../components/Error";
import Layout from "../../../components/Layout";
import TextInput from "../../../components/TextInput";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireEmployee } from "../../../lib/hooks/useRole";

const validationSchema = Yup.object({
  old_password: Yup.string().required("Please enter the old password"),
  new_password: Yup.string().required("Please enter your desired new password"),
});

const ChangePasswordForm = () => {
  const { user, invalidate } = useRequireEmployee();
  const axios = useAxios();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const changePassword = async (values: {
    old_password: string;
    new_password: string;
  }) => {
    setIsLoading(true);
    setError("");
    try {
      await axios.post(`/employee/users/change-password`, values);
      // get token for new password
      const { data } = await axios.post(`/login`, {
        email: user?.email,
        password: values.new_password,
      });
      Cookies.set("token", data.token);
      invalidate();
      navigate("/");
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const formik = useFormik({
    initialValues: { old_password: "", new_password: "" },
    onSubmit: changePassword,
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="block font-medium">
        Old password
        <TextInput
          id="old_password"
          type="password"
          {...formik.getFieldProps("old_password")}
        />
      </label>
      <Error error={formik.errors.old_password} />

      <label className="block font-medium">
        New password
        <TextInput
          id="new_password"
          type="password"
          {...formik.getFieldProps("new_password")}
        />
      </label>
      <Error error={formik.errors.new_password} />

      <Error error={error} />

      {isLoading && <p className="text-black-500 mb-2">Please wait...</p>}

      <Button type="submit" disabled={isLoading}>
        Change password
      </Button>
    </form>
  );
};

const ChangePasswordPage = () => {
  useRequireEmployee();
  return (
    <Layout title="Change password">
      <Card>
        <h2 className="text-2xl font-semibold mb-6">Change password</h2>
        <ChangePasswordForm />
      </Card>
    </Layout>
  );
};

export default ChangePasswordPage;
