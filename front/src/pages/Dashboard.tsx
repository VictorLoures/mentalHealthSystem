import { Button } from "@mantine/core";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
      <Button onClick={logout}>Sair</Button>
    </div>
  );
};

export default Dashboard;
