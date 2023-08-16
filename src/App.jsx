import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/loading.component/loading.components.jsx";
import Navbar from "./components/navbar.components/navbar.components.jsx";

const Home = lazy(() => import("./pages/home.pages/home.pages.jsx"));
const Register = lazy(() =>
  import("./pages/register.pages/register.pages.jsx")
);
const Login = lazy(() => import("./pages/login.pages/login.pages.jsx"));
const CastVote = lazy(() =>
  import("./pages/cast-vote.pages/cast-vote.pages.jsx")
);
const Dashboard = lazy(() =>
  import("./pages/dashboard.pages/dashboard.pages.jsx")
);
const Admin = lazy(() => import("./pages/admin.page/admin.pages.jsx"));
const CreatePoll = lazy(() =>
  import("./pages/admin.page/create-poll.pages/create-poll.pages.jsx")
);
const CandidateOption = lazy(() =>
  import("./pages/admin.page/create-poll.pages/create-candidate.pages.jsx")
);

const App = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cast-vote" element={<CastVote />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<Admin />}>
            <Route path="create-poll" element={<CreatePoll />} />
            <Route path="poll-candidate" element={<CandidateOption />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
