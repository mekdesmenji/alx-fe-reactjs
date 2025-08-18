import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);

    setErrors((err) => ({ ...err, [name]: "" }));
    setMsg("");
  };

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = "Username required";
    if (!email.trim()) e.email = "Email required";
    if (!password.trim()) e.password = "Password required";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const eMap = validate();
    if (Object.keys(eMap).length) return setErrors(eMap);

    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setMsg(`✅ Registered! Token: ${data.token}`);
      setUsername("");
      setEmail("");
      setPassword("");
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
        value={username}
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
        value={email}
        onChange={onChange}
        disabled={loading}
      />
      {errors.email && <div style={{ color: "#c62828" }}>{errors.email}</div>}

      <label>Password</label>
      <input
        type="password"
        name="password"
        value={password}
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
