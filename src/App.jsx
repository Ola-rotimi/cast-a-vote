import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.components/navbar.components.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<h1>Home</h1>} />
        <Route path="dashboard" element={<h1>Dashboard</h1>} />
        <Route path="cast-vote" element={<h1>Cast Your Vote</h1>} />
        <Route path="Manifesto" element={<h1>Manifesto</h1>} />
        <Route path="register" element={<h1>Register</h1>} />
        <Route path="login" element={<h1>Log In</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
