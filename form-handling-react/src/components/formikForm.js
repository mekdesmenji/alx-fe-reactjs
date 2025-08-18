import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const schema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Min 3 characters")
    .required("Username required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password required"),
});

export default function FormikRegistrationForm() {
  const [msg, setMsg] = useState("");

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setMsg("");
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
          setMsg(`✅ Registered! Token: ${data.token}`);
          resetForm();
        } catch (err) {
          setMsg(`❌ ${err.message}`);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form noValidate>
          <label>Username</label>
          <Field
            name="username"
            placeholder="sophia_dev"
            disabled={isSubmitting}
          />
          <ErrorMessage
            name="username"
            component="div"
            style={{ color: "#c62828" }}
          />

          <label>Email</label>
          <Field
            type="email"
            name="email"
            placeholder="you@example.com"
            disabled={isSubmitting}
          />
          <ErrorMessage
            name="email"
            component="div"
            style={{ color: "#c62828" }}
          />

          <label>Password</label>
          <Field
            type="password"
            name="password"
            placeholder="••••••••"
            disabled={isSubmitting}
          />
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: "#c62828" }}
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Register"}
          </button>

          {msg && <p>{msg}</p>}
          <p style={{ fontSize: 12, color: "#555" }}>
            Note: Mock API <code>reqres.in</code> only accepts{" "}
            <code>email</code> and <code>password</code>.
          </p>
        </Form>
      )}
    </Formik>
  );
}
