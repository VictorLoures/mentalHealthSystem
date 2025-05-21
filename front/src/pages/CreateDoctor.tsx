import { useContext, useEffect } from "react";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import api from "../api/api";
import { IMaskInput } from "react-imask";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  CAMPO_OBRIGATORIO,
  formatCep,
  formatDate,
  isOver18,
  isValidCPF,
  showError,
  showSuccess,
} from "../utils/util";
import { Doctor } from "../model/Doctor";
import { Address } from "../model/Address";
import AddressComponent from "../components/AddressComponent";
import { create, update } from "../api/api.uti";

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
  passwordConfirmation?: string;
  idAdress?: string;
  adressNotNumber?: boolean;
}

const fieldsRequiredSave = ["name", "password", "passwordConfirmation"];
const fieldsRequiredEdit = ["name"];

const Register = () => {
  const { id } = useParams();
  const fieldsRequiredToUse = id ? fieldsRequiredEdit : fieldsRequiredSave;

  const form = useForm<Doctor & Address & ScreenFields>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      phoneNumber: "",
      dateBirth: "",
      cpf: "",
      crpNumber: "",
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
      email: (value: any) =>
        value && (/^\S+@\S+$/.test(value) ? null : "E-mail inválido"),
      cpf: (value: any) => (value && isValidCPF(value) ? null : "CPF inválido"),
      cep: (value: any) => (value?.length === 9 ? null : CAMPO_OBRIGATORIO),
      dateBirth: (value: any) =>
        value && isOver18(value) ? null : "Você deve ter mais de 18 anos",
      ...fieldsRequiredToUse.reduce((acc, field) => {
        acc[field] = isNotEmpty(CAMPO_OBRIGATORIO);
        return acc;
      }, {} as Record<string, ReturnType<typeof isNotEmpty>>),
    },
  });

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      api.get(`/findDoctorById/${id}`).then((response) => {
        if (response.data) {
          const data = response.data;

          form.setValues({
            id: data.id,
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            dateBirth: formatDate(data.dateBirth),
            cpf: data.cpf,
            crpNumber: data.crpNumber,
            idAdress: data.address?.id ?? "",
            cep: data.address?.cep ? formatCep(data.address.cep) : "",
            city: data.address?.city ?? "",
            neighborhood: data.address?.neighborhood ?? "",
            street: data.address?.street ?? "",
            number: data.address?.number ?? "",
            complement: data.address?.complement ?? "",
            state: data.address?.state ?? "",
            password: "",
            passwordConfirmation: "",
            adressNotNumber: !data.address?.number,
          });
        } else {
          showError("Ocorreu um erro inesperado!");
        }
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (auth?.loggedDoctor && !id) {
      navigate("/");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const handleSubmit = (values: typeof form.values) => {
    const {
      passwordConfirmation,
      adressNotNumber,
      idAdress,
      cep,
      state,
      city,
      street,
      neighborhood,
      complement,
      number,
      id: idDoctor,
      ...doctor
    } = values;

    let result = true;
    if (passwordConfirmation !== doctor.password) {
      form.setFieldError("passwordConfirmation", "As senhas não conferem");
      form.setFieldError("password", "As senhas não conferem");
      result = false;
    }

    if (!number && !adressNotNumber) {
      result = false;
    }

    if (result) {
      doctor.cpf = doctor.cpf?.replace(/\D/g, "");
      const address: Address = {
        cep: cep?.replace(/\D/g, ""),
        state,
        city,
        street,
        neighborhood,
        complement,
        number,
      };

      const doctorToSend: Doctor = {
        ...doctor,
        address,
      };

      if (id) {
        if (doctorToSend && doctorToSend.address) {
          doctorToSend.address.id = idAdress;
        }
        doctorToSend.id = idDoctor;
        update(
          "/updateDoctor",
          doctorToSend,
          "Doutor atualizado com sucesso!",
          navigate
        );
        auth?.setLoggedDoctor({
          id: idDoctor,
          name: doctor.name,
          email: doctor.email,
        });
      } else {
        create(
          "/createDoctor",
          doctorToSend,
          "Doutor cadastrado com sucesso!",
          navigate,
          "/login"
        );
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <h4>Cadastro de psicólogo</h4>
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
      <PasswordInput
        withAsterisk={!id}
        label="Senha"
        key={form.key("password")}
        {...form.getInputProps("password")}
        maxLength={50}
      />
      <PasswordInput
        withAsterisk={!id}
        label="Confirmar senha"
        key={form.key("passwordConfirmation")}
        {...form.getInputProps("passwordConfirmation")}
        maxLength={50}
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
      <TextInput
        withAsterisk
        label="Número do CRP"
        key={form.key("crpNumber")}
        {...form.getInputProps("crpNumber")}
        maxLength={20}
      />

      <AddressComponent form={form} />
      {!id && <Link to="/login">Ja possui conta? Faça login</Link>}
      <Group justify="flex-end" mt="md">
        {id && (
          <Button color="red" onClick={() => navigate("/")}>
            Cancelar
          </Button>
        )}
        <Button type="submit">{!id ? "Cadastrar" : "Salvar"}</Button>
      </Group>
    </form>
  );
};

export default Register;
