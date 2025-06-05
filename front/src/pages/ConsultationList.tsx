import { modals } from "@mantine/modals";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import TableComponent from "../components/TableComponent";
import { AuthContext } from "../context/AuthContext";
import { LoadingContext } from "../context/LoadingContext";
import { Consultation } from "../model/Consultation";
import { formatToBRL, showError, showSuccess } from "../utils/util";
import { ActionIcon } from "@mantine/core";
import { IconCoin } from "@tabler/icons-react";

interface ConsultationListProps {
  title?: string;
  isDashboard?: boolean;
}

const ConsultationList = ({ title, isDashboard }: ConsultationListProps) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const loading = useContext(LoadingContext);

  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {
    if (auth?.loggedDoctor?.id) {
      if (isDashboard) {
        getConsultationsInDay();
      } else {
        getConsultations();
      }
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

  const getConsultationsInDay = () => {
    loading?.show();
    api
      .get(`/findAllByDoctorIdInDay/${auth?.loggedDoctor?.id}`)
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

  const payConsultation = (id: string, paid: boolean) => {
    if (paid) {
      showError("A consulta já foi paga!");
    } else {
      api.get(`/payConsultation/${id}`);
      const consultationsUpdated: Consultation[] = [];
      consultations.forEach((con: Consultation) => {
        if (Number(con.id) === Number(id)) {
          con.paid = true;
        }
        consultationsUpdated.push(con);
      });
      setConsultations(consultationsUpdated);
      showSuccess("Baixa efetuada com sucesso!");
    }
  };

  const dashboardContentFn = (obj: any) => {
    return (
      <ActionIcon
        variant="filled"
        color="green"
        aria-label="Dar baixa no valor"
      >
        <IconCoin
          style={{ width: "70%", height: "70%" }}
          stroke={1.5}
          onClick={() => payConsultation(obj.id, obj.paid)}
        />
      </ActionIcon>
    );
  };

  const columns: any[] = [
    {
      label: "Paciente",
      field: "patient.name",
    },
    {
      label: "Dia e hora",
      field: "day",
    },
    {
      label: "Preço",
      field: "price",
      fnFmt: formatToBRL,
    },
    {
      label: "Já foi pago",
      field: "paid",
      fnFmt: formatBooleanColumn,
    },
    {
      label: "É presencial?",
      field: "online",
      fnFmt: formatBooleanColumn,
    },
  ];

  return (
    <TableComponent
      title={title ? title : "Consultas"}
      createView="/createConsultation"
      data={consultations}
      columns={columns}
      isDashboard={isDashboard}
      dashboardContentFn={dashboardContentFn}
      updateFn={updateConsultation}
      deleteFn={deleteConsultation}
      msgNoData="Você não possui consultas"
    />
  );
};

export default ConsultationList;
