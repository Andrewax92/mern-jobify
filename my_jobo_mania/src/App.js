import { BrowserRouter, Routes, Route, } from "react-router-dom"
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Stats from "./pages/dashboard/Stats";
import AllJobs from "./pages/dashboard/AllJobs";
import Profile from "./pages/dashboard/Profile";
import Addjob from "./pages/dashboard/Addjob";
import SharedLayout from "./pages/dashboard/SharedLayout";


function App() {
  return (


    <BrowserRouter>

      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        } >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-job" element={<Addjob />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={< Error />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
