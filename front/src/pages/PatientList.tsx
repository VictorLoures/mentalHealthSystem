import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import TableComponent from "../components/TableComponent";
import { AuthContext } from "../context/AuthContext";
import { LoadingContext } from "../context/LoadingContext";
import { formatDate } from "../utils/util";

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

  const columns: any[] = [
    {
      label: "Nome",
      field: "name",
    },
    {
      label: "Email",
      field: "email",
    },
    {
      label: "Telefone",
      field: "phoneNumber",
    },
    {
      label: "Data de nascimento",
      field: "dateBirth",
      fnFmt: formatDate,
    },
  ];

  return (
    <TableComponent
      title="Pacientes"
      createView="/createPatient"
      data={patients}
      columns={columns}
      updateFn={updatePatient}
      msgNoData="Você não possui pacientes"
    />
  );
};

export default PatientList;
