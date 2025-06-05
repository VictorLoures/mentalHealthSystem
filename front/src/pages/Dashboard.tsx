import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ConsultationList from "./ConsultationList";

const Dashboard = () => {
  const auth = useContext(AuthContext);

  return (
    <div>
      <span>Olá {auth?.loggedDoctor?.name}!</span>
      <ConsultationList title="Consultas do dia" isDashboard={true} />
    </div>
  );
};

export default Dashboard;
