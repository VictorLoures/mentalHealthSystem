import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import api from "../api/api";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import {
  CAMPO_OBRIGATORIO,
  isOver18,
  isValidCPF,
  showError,
  showSuccess,
} from "../utils/util";
import { Address } from "../model/Address";
import AddressComponent from "../components/AddressComponent";
import { Patient } from "../model/Patient";
import { useContext } from "react";
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

      api
        .post("/createPatient", patientToSend)
        .then(() => {
          showSuccess("Paciente cadastrado com sucesso!");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          showError(error.response.data);
        });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <h4>Cadastro de paciente</h4>
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
        <Button color="red" onClick={() => navigate("/")}>
          Cancelar
        </Button>
        <Button type="submit">Cadastrar</Button>
      </Group>
    </form>
  );
};

export default CreatePatient;
