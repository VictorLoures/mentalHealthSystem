import { Button, Group, Table } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { LoadingContext } from "../context/LoadingContext";

const PatientList = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const loading = useContext(LoadingContext);

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    console.log("fora");
    console.log(auth);
    if (auth?.loggedDoctor?.id) {
      console.log("dentro");
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

  const formatDate = (isoDate: string): string => {
    return new Date(isoDate).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
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
      </Group>
    </>
  );
};

export default PatientList;
