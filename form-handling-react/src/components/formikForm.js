import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function FormikForm() {
  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setStatus }
  ) => {
    setSubmitting(true);
    setStatus("");
    try {
      const res = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setStatus(`✅ Registered! Token: ${data.token}`);
      resetForm();
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <label>Username</label>
          <Field name="username" />
          <ErrorMessage
            name="username"
            component="div"
            style={{ color: "#c62828" }}
          />

          <label>Email</label>
          <Field type="email" name="email" />
          <ErrorMessage
            name="email"
            component="div"
            style={{ color: "#c62828" }}
          />

          <label>Password</label>
          <Field type="password" name="password" />
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: "#c62828" }}
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Register"}
          </button>

          {status && <p>{status}</p>}
        </Form>
      )}
    </Formik>
  );
}
