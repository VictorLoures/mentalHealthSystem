import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import api from "../api/api";
import { IMaskInput } from "react-imask";
import { useNavigate, useParams } from "react-router-dom";
import {
  CAMPO_OBRIGATORIO,
  formatCep,
  formatDate,
  isOver18,
  isValidCPF,
  showError,
  showSuccess,
} from "../utils/util";
import { Address } from "../model/Address";
import AddressComponent from "../components/AddressComponent";
import { Patient } from "../model/Patient";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const IMaskInputDateWrapper = (props: any) => {
  return <IMaskInput mask="00/00/0000" {...props} />;
};

const IMaskInputCPFWrapper = (props: any) => {
  return <IMaskInput mask="000.000.000-00" {...props} />;
};

const IMaskPhoneWrapper = (props: any) => {
  return <IMaskInput mask="(00) 00000-0000" {...props} />;
};

interface ScreenFields {
  adressNotNumber?: boolean;
  idAdress?: string;
}

const CreatePatient = () => {
  const form = useForm<Patient & Address & ScreenFields>({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      dateBirth: "",
      minor: false,
      nameResponsible: "",
      phoneNumberResponsible: "",
      cpf: "",
      cep: "",
      city: "",
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
      state: "",
      adressNotNumber: false,
    },
    validateInputOnBlur: true,
    mode: "controlled",
    validate: {
      name: isNotEmpty(CAMPO_OBRIGATORIO),
      email: (value: any) =>
        value && (/^\S+@\S+$/.test(value) ? null : "E-mail inválido"),
      cpf: (value: any) => (value && isValidCPF(value) ? null : "CPF inválido"),
      cep: (value: any) => (value?.length === 9 ? null : CAMPO_OBRIGATORIO),
      dateBirth: (value: any) =>
        value && isOver18(value) ? null : "Você deve ter mais de 18 anos",
    },
  });

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/findPatientById/${id}`).then((response) => {
        if (response.data) {
          const data = response.data;

          form.setValues({
            id: data.id,
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            dateBirth: formatDate(data.dateBirth),
            cpf: data.cpf,
            idAdress: data.address?.id ?? "",
            cep: data.address?.cep ? formatCep(data.address.cep) : "",
            city: data.address?.city ?? "",
            neighborhood: data.address?.neighborhood ?? "",
            street: data.address?.street ?? "",
            number: data.address?.number ?? "",
            complement: data.address?.complement ?? "",
            state: data.address?.state ?? "",
            adressNotNumber: !data.address?.number,
          });
        } else {
          showError("Ocorreu um erro inesperado!");
        }
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values: typeof form.values) => {
    const {
      adressNotNumber,
      cep,
      state,
      city,
      street,
      neighborhood,
      complement,
      number,
      idAdress,
      id: idPatient,
      ...patient
    } = values;

    let result = true;
    if (!number && !adressNotNumber) {
      result = false;
    }

    if (result) {
      patient.cpf = patient.cpf?.replace(/\D/g, "");
      const address: Address = {
        cep: cep?.replace(/\D/g, ""),
        state,
        city,
        street,
        neighborhood,
        complement,
        number,
      };

      const patientToSend: Patient = {
        ...patient,
        doctor: {
          id: auth?.loggedDoctor?.id,
        },
        address,
      };

      if (id) {
        if (patientToSend && patientToSend.address) {
          patientToSend.address.id = idAdress;
        }
        patientToSend.id = idPatient;
        api
          .put("/updatePatient", patientToSend)
          .then(() => {
            showSuccess("Paciente atualizado com sucesso!");
            navigate("/patients");
          })
          .catch((error) => {
            showError(error.response.data);
          });
      } else {
        api
          .post("/createPatient", patientToSend)
          .then(() => {
            showSuccess("Paciente cadastrado com sucesso!");
            navigate("/");
          })
          .catch((error) => {
            showError(error.response.data);
          });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <h4>Cadastro de paciente</h4>
      <div style={{ display: "none" }}>
        <TextInput
          withAsterisk
          label="id"
          key={form.key("id")}
          {...form.getInputProps("id")}
          maxLength={150}
        />
      </div>
      <div style={{ display: "none" }}>
        <TextInput
          withAsterisk
          label="id"
          key={form.key("idAdress")}
          {...form.getInputProps("idAdress")}
          maxLength={150}
        />
      </div>
      <TextInput
        withAsterisk
        label="Nome completo"
        key={form.key("name")}
        {...form.getInputProps("name")}
        maxLength={150}
      />
      <TextInput
        withAsterisk
        label="Email"
        key={form.key("email")}
        {...form.getInputProps("email")}
        maxLength={150}
      />
      <TextInput
        withAsterisk
        label="Número de telefone"
        component={IMaskPhoneWrapper}
        key={form.key("phoneNumber")}
        {...form.getInputProps("phoneNumber")}
      />
      <TextInput
        withAsterisk
        label="Data de nascimento"
        component={IMaskInputDateWrapper}
        key={form.key("dateBirth")}
        {...form.getInputProps("dateBirth")}
      />
      <TextInput
        withAsterisk
        label="CPF"
        component={IMaskInputCPFWrapper}
        key={form.key("cpf")}
        {...form.getInputProps("cpf")}
      />
      <Checkbox
        mt="md"
        label="Paciente menor de idade"
        key={form.key("minor")}
        {...form.getInputProps("minor", { type: "checkbox" })}
      />
      <TextInput
        label="Nome completo do responsável"
        key={form.key("nameResponsible")}
        {...form.getInputProps("nameResponsible")}
        maxLength={150}
        disabled={!form.values.minor}
      />
      <TextInput
        label="Número de telefone do responsável"
        component={IMaskPhoneWrapper}
        key={form.key("phoneNumberResponsible")}
        {...form.getInputProps("phoneNumberResponsible")}
        disabled={!form.values.minor}
      />

      <AddressComponent form={form} />
      <Group justify="flex-end" mt="md">
        <Button color="red" onClick={() => navigate("/patients")}>
          Cancelar
        </Button>
        <Button type="submit">Cadastrar</Button>
      </Group>
    </form>
  );
};

export default CreatePatient;
