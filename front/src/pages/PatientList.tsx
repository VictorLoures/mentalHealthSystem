import { ActionIcon, Button, Group, Table } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { LoadingContext } from "../context/LoadingContext";
import { formatDate } from "../utils/util";
import { IconPencil } from "@tabler/icons-react";

const PatientList = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const loading = useContext(LoadingContext);

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (auth?.loggedDoctor?.id) {
      loading?.show();
      api
        .get(`/findByAllByDoctorId/${auth?.loggedDoctor?.id}`)
        .then((response) => {
          loading?.hide();
          setPatients(response.data);
        })
        .catch(() => loading?.hide());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePatient = (id: string) => {
    if (id) {
      navigate(`/editPatient/${id}`);
    }
  };

  return (
    <>
      <h3>Seus pacientes</h3>
      {patients && patients.length > 0 && (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Nome</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Telefone</Table.Th>
              <Table.Th>Data de nascimento</Table.Th>
              <Table.Th>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {patients.map((it: any) => {
              return (
                <Table.Tr key={it.id}>
                  <Table.Td>{it.name}</Table.Td>
                  <Table.Td>{it.email}</Table.Td>
                  <Table.Td>{it.phoneNumber}</Table.Td>
                  <Table.Td>{formatDate(it.dateBirth)}</Table.Td>
                  <Table.Td>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <ActionIcon
                        variant="filled"
                        color="blue"
                        aria-label="Editar"
                      >
                        <IconPencil
                          style={{ width: "70%", height: "70%" }}
                          stroke={1.5}
                          onClick={() => updatePatient(it.id)}
                        />
                      </ActionIcon>
                    </div>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      )}
      {!patients ||
        (patients.length <= 0 && <h3>Você não possui pacientes</h3>)}
      <Group justify="flex-end" mt="md">
        <Button color="red" onClick={() => navigate("/")}>
          Voltar a página inicial
        </Button>
        <Button color="green" onClick={() => navigate("/createPatient")}>
          Incluir
        </Button>
      </Group>
    </>
  );
};

export default PatientList;
