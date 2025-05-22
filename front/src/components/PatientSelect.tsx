import { Select } from "@mantine/core";
import { useState } from "react";
import api from "../api/api";

interface PatientSelectProps {
  setSelectedPatientId: (value: String | null) => void;
}

const PatientSelect = ({ setSelectedPatientId }: PatientSelectProps) => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = async (query: string) => {
    setSearch(query);
    if (query.length >= 2) {
      const res = await api.get(`/findPatientByQuery/${query}`);
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
      label="Paciente"
      placeholder="Digite o Nome / Email / CPF para procurar um paciente"
      searchable
      nothingFoundMessage="Nenhum paciente encontrado"
      data={patients}
      onSearchChange={handleSearch}
      searchValue={search}
      onChange={(value) => setSelectedPatientId(value)}
    />
  );
};

export default PatientSelect;
