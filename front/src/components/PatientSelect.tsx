import { Select } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { showError } from "../utils/util";
import { LoadingContext } from "../context/LoadingContext";
import { AuthContext } from "../context/AuthContext";

interface PatientSelectProps {
  setSelectedPatientId: (value: string | null) => void;
  selectedPatientId: string | null;
  form: any;
}

const PatientSelect = ({
  setSelectedPatientId,
  selectedPatientId,
  form,
}: PatientSelectProps) => {
  const [patients, setPatients] = useState<any>([]);
  const [search, setSearch] = useState("");

  const loading = useContext(LoadingContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (selectedPatientId && patients.length === 0) {
      const fetchPatient = async () => {
        try {
          loading?.show();
          const res = await api.get(
            `/findPatientById/${auth?.loggedDoctor?.id}/${selectedPatientId}`
          );
          const patient = res.data;
          setPatients([
            {
              value: String(patient.id),
              label: `${patient.name}`,
            },
          ]);
          loading?.hide();
        } catch (error) {
          showError("Ocorreu um erro inesperado");
          loading?.hide();
        }
      };

      fetchPatient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPatientId]);

  const handleSearch = async (query: string) => {
    setSearch(query);
    if (query) {
      const res = await api.get(
        `/findPatientByQuery/${auth?.loggedDoctor?.id}/${query}`
      );
      console.log(
        res.data.map((patient: any) => ({
          value: String(patient.id),
          label: `${patient.name} `,
        }))
      );
      setPatients(
        res.data.map((patient: any) => ({
          value: String(patient.id),
          label: `${patient.name} `,
        }))
      );
    }
  };

  return (
    <Select
      withAsterisk
      label="Paciente"
      placeholder="Digite o Nome / Email / CPF para procurar um paciente"
      searchable
      nothingFoundMessage="Nenhum paciente encontrado"
      data={patients}
      onSearchChange={handleSearch}
      searchValue={search}
      value={selectedPatientId}
      onChange={(value) => {
        form.setFieldValue("patient", value);
        setSelectedPatientId(value);
      }}
    />
  );
};

export default PatientSelect;
