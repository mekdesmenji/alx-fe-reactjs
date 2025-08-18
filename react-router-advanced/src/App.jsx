import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPost from "./pages/BlogPost";
import Home from "./pages/Home"; // optional
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/profile/*"
          element={<PrivateRoute element={<Profile />} />}
        />

        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
