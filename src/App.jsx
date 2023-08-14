import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar.components/navbar.components.jsx";
import Home from "./pages/home.pages/home.pages.jsx";
import Register from "./pages/register.pages/register.pages.jsx";
import Login from "./pages/login.pages/login.pages.jsx";
import CastVote from "./pages/cast-vote.pages/cast-vote.pages.jsx";
import Dashboard from "./pages/dashboard.pages/dashboard.pages.jsx";
import Admin from "./pages/admin.page/admin.pages.jsx";
import CreatePoll from "./pages/admin.page/create-poll.pages/create-poll.pages.jsx";
import CandidateOption from "./pages/admin.page/create-poll.pages/create-candidate.pages.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cast-vote" element={<CastVote />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<Admin />}>
          <Route path="create-poll" element={<CreatePoll />} />
          <Route path="poll-candidate" element={<CandidateOption />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
