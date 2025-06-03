import { ActionIcon, Menu } from "@mantine/core";
import {
  IconCurrencyDollar,
  IconDoorExit,
  IconEdit,
  IconMenu,
  IconStethoscope,
  IconUser,
} from "@tabler/icons-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HeaderComponent = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    auth?.logoutDoctor();
    navigate("/login");
  };

  const navigateFn = (route: string) => navigate(route);

  return (
    <div className="header-div">
      <h4>Mental Health System</h4>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon variant="filled" color="blue" size="lg" radius="md">
            <IconMenu size={20} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Funcionalidades</Menu.Label>
          <Menu.Item
            onClick={() => navigateFn("/patients")}
            leftSection={<IconUser size={14} />}
          >
            Ver meus pacientes
          </Menu.Item>
          <Menu.Item
            onClick={() => navigateFn("/consultations")}
            leftSection={<IconStethoscope size={14} />}
          >
            Ver minhas consultas
          </Menu.Item>
          <Menu.Item
            onClick={() => navigateFn("/")}
            leftSection={<IconCurrencyDollar size={14} />}
          >
            Financeiro
          </Menu.Item>
          <Menu.Item
            onClick={() => navigateFn(`editDoctor/${auth?.loggedDoctor?.id}`)}
            leftSection={<IconEdit size={14} />}
          >
            Editar usuário
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            onClick={logout}
            color="red"
            leftSection={<IconDoorExit size={14} />}
          >
            Sair
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default HeaderComponent;
