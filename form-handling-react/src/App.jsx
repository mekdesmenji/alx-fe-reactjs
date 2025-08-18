import RegistrationForm from "./components/RegistrationForm.jsx";

export default function App() {
  return (
    <div
      style={{ maxWidth: 720, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <h1>Form Handling in React</h1>
      <h2>1) Controlled Components</h2>
      <RegistrationForm />
    </div>
  );
}
