import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar.components/navbar.components.jsx";
import Home from "./pages/home.pages/home.pages.jsx";
import Register from "./pages/register.pages/register.pages.jsx";
import Login from "./pages/login.pages/login.pages.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<h1>Dashboard</h1>} />
        <Route path="cast-vote" element={<h1>Cast Your Vote</h1>} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
