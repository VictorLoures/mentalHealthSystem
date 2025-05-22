import { ActionIcon, Button, Group, Table } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { LoadingContext } from "../context/LoadingContext";
import { formatDateWhitHour, formatToBRL, showSuccess } from "../utils/util";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

const ConsultationList = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const loading = useContext(LoadingContext);

  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    if (auth?.loggedDoctor?.id) {
      getConsultations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getConsultations = () => {
    loading?.show();
    api
      .get(`/findAllByDoctorId/${auth?.loggedDoctor?.id}`)
      .then((response) => {
        loading?.hide();
        setConsultations(response.data);
      })
      .catch(() => loading?.hide());
  };

  const updateConsultation = (id: string) => {
    if (id) {
      navigate(`/editConsultation/${id}`);
    }
  };

  const deleteConsultation = (id: string) => {
    const exec = () => {
      loading?.show();
      api
        .delete(`/deleteConsultation/${id}`)
        .then((_) => {
          getConsultations();
          showSuccess("Consulta excluida com sucesso!");
        })
        .catch(() => loading?.hide());
    };

    modals.openConfirmModal({
      title: "Excluir consulta?",
      children: "Deseja excluir a consulta? Essa ação não poderá ser desfeita!",
      labels: { confirm: "Excluir", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onConfirm: exec,
    });
  };

  const formatBooleanColumn = (value: boolean) => (value ? "Sim" : "Não");

  return (
    <>
      <h3>Suas consultas</h3>
      {consultations && consultations.length > 0 && (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Paciente</Table.Th>
              <Table.Th>Dia e hora</Table.Th>
              <Table.Th>Preço</Table.Th>
              <Table.Th>Já foi Pago?</Table.Th>
              <Table.Th>É presencial?</Table.Th>
              <Table.Th>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {consultations.map((it: any) => {
              return (
                <Table.Tr key={it.id}>
                  <Table.Td>{it.patient.name}</Table.Td>
                  <Table.Td>{formatDateWhitHour(it.day)}</Table.Td>
                  <Table.Td>{formatToBRL(it.price)}</Table.Td>
                  <Table.Td>{formatBooleanColumn(it.paid)}</Table.Td>
                  <Table.Td>{formatBooleanColumn(it.online)}</Table.Td>
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
                          onClick={() => updateConsultation(it.id)}
                        />
                      </ActionIcon>
                      <ActionIcon
                        variant="filled"
                        color="red"
                        aria-label="Excluir"
                      >
                        <IconTrash
                          style={{ width: "70%", height: "70%" }}
                          stroke={1.5}
                          onClick={() => deleteConsultation(it.id)}
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
      {!consultations ||
        (consultations.length <= 0 && <h3>Você não possui consultas</h3>)}
      <Group justify="flex-end" mt="md">
        <Button color="green" onClick={() => navigate("/createConsultation")}>
          Incluir
        </Button>
        <Button color="red" onClick={() => navigate("/")}>
          Voltar a página inicial
        </Button>
      </Group>
    </>
  );
};

export default ConsultationList;
