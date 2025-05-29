import { Button } from "@mantine/core";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ConsultationList from "./ConsultationList";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    auth?.logoutDoctor();
    navigate("/login");
  };

  return (
    <div>
      <p>
        Olá {auth?.loggedDoctor?.name}!
        <ConsultationList title="Consultas do dia" isDashboard />
      </p>
      <Link to="/patients">Ver meus pacientes</Link>
      <br />
      <Link to="/consultations">Ver minhas consultas</Link>
      <br />
      <Link to={`editDoctor/${auth?.loggedDoctor?.id}`}>Editar usuário</Link>
      <br />
      <Button onClick={logout}>Sair</Button>
    </div>
  );
};

export default Dashboard;
