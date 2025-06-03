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
import ConsultationList from "../pages/ConsultationList";
import CreateConsultation from "../pages/CreateConsultation";
import HeaderComponent from "../components/HeaderComponent";

const AppRoutes = () => (
  <Router>
    <HeaderComponent />
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/createPatient" element={<CreatePatient />} />
        <Route path="/createConsultation" element={<CreateConsultation />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/consultations" element={<ConsultationList />} />
        <Route path="/editDoctor/:id" element={<CreateDoctor />} />
        <Route path="/editPatient/:id" element={<CreatePatient />} />
        <Route path="/editConsultation/:id" element={<CreateConsultation />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<CreateDoctor />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;
