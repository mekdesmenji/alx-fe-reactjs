import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./pages/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/:userId" element={<User />} />

        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
