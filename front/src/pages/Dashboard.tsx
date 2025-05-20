import { Button } from "@mantine/core";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

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
        Olá {auth?.loggedDoctor?.name}! - {auth?.loggedDoctor?.email}
      </p>
      <Link to="/createPatient">Cadastro de paciente</Link>
      <br />
      <Link to="/patients">Ver meus pacientes</Link>
      <br />
      <Link to={`editDoctor/${auth?.loggedDoctor?.id}`}>Editar usuário</Link>
      <br />
      <Button onClick={logout}>Sair</Button>
    </div>
  );
};

export default Dashboard;
