import { useState } from "react";

export default function RegistrationForm() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: "" }));
    setMsg("");
  };

  const validate = () => {
    const e = {};
    if (!values.username.trim()) e.username = "Username required";
    if (!values.email.trim()) e.email = "Email required";
    if (!values.password.trim()) e.password = "Password required";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const eMap = validate();
    if (Object.keys(eMap).length) return setErrors(eMap);

    setLoading(true);
    setMsg("");
    try {
      // Mock API expects only email + password
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
      setValues({ username: "", email: "", password: "" });
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <label>Username</label>
      <input
        name="username"
        value={values.username}
        onChange={onChange}
        disabled={loading}
      />
      {errors.username && (
        <div style={{ color: "#c62828" }}>{errors.username}</div>
      )}

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={onChange}
        disabled={loading}
      />
      {errors.email && <div style={{ color: "#c62828" }}>{errors.email}</div>}

      <label>Password</label>
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={onChange}
        disabled={loading}
      />
      {errors.password && (
        <div style={{ color: "#c62828" }}>{errors.password}</div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Register"}
      </button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
