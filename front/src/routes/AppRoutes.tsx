import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../pages/Dashboard";
import CreateDoctor from "../pages/CreateDoctor";
import CreatePatient from "../pages/CreatePatient";
import PatientList from "../pages/PatientList";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/createPatient" element={<CreatePatient />} />
        <Route path="/patients" element={<PatientList />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<CreateDoctor />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;
