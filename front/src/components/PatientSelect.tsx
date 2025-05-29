import { ComboboxItem, OptionsFilter, Select } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { showError } from "../utils/util";
import { LoadingContext } from "../context/LoadingContext";
import { AuthContext } from "../context/AuthContext";
import { useDebouncedValue } from "@mantine/hooks";

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
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const loading = useContext(LoadingContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!search.trim()) {
      setSelectedPatientId(null);
      form.setFieldValue("patient", null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (selectedPatientId && patients.length === 0) {
      const fetchPatient = async () => {
        try {
          loading?.show();
          const res = await api.get(`/findPatientById/${selectedPatientId}`);
          const patient = res.data;
          setPatients([
            {
              value: String(patient.id),
              label: `${patient.name}`,
              search:
                `${patient.name} ${patient.email} ${patient.cpf}`.toLowerCase(),
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

  useEffect(() => {
    const fetchPatients = async () => {
      if (!debouncedSearch.trim()) {
        setPatients([]);
        return;
      }

      try {
        const res = await api.get(
          `/findPatientByQuery/${auth?.loggedDoctor?.id}/${debouncedSearch}`
        );
        const results = res.data.map((patient: any) => ({
          value: String(patient.id),
          label: `${patient.name}`,
          search:
            `${patient.name} ${patient.email} ${patient.cpf}`.toLowerCase(),
        }));
        setPatients(results);
      } catch (error) {
        showError("Erro ao buscar pacientes");
      }
    };

    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const optionsFilter: OptionsFilter = ({ options, search }) => {
    const searchLower = search.toLowerCase().trim();

    return (options as ComboboxItem[]).filter((option) => {
      const searchable = (option as any).search?.toLowerCase() || "";
      return searchable.includes(searchLower);
    });
  };

  return (
    <Select
      withAsterisk
      label="Paciente"
      placeholder="Digite o Nome / Email / CPF para procurar um paciente"
      searchable
      nothingFoundMessage="Nenhum paciente encontrado"
      data={patients}
      onSearchChange={setSearch}
      searchValue={search}
      value={selectedPatientId}
      onChange={(value) => {
        form.setFieldValue("patient", value);
        setSelectedPatientId(value);
        if (!value) {
          setSearch("");
          setPatients([]);
        }
      }}
      filter={optionsFilter}
    />
  );
};

export default PatientSelect;
