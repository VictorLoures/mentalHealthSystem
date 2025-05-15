import { useContext, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Group,
  NumberInput,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import api from "../api/api";
// import { UF_ENUM_VALUES } from '../models/enum/ufEnum';
import { IMaskInput } from "react-imask";
import { Link, useNavigate } from "react-router-dom";
import { LoadingContext } from "../context/LoadingContext";
import { AuthContext } from "../context/AuthContext";
import {
  CAMPO_OBRIGATORIO,
  isOver18,
  isValidCPF,
  liberarFocoInput,
  showError,
  showSuccess,
} from "../utils/util";
import { Doctor } from "../model/Doctor";

const IMaskInputDateWrapper = (props: any) => {
  return <IMaskInput mask="00/00/0000" {...props} />;
};

const IMaskInputCPFWrapper = (props: any) => {
  return <IMaskInput mask="000.000.000-00" {...props} />;
};

const IMaskInputCEPWrapper = (props: any) => {
  return <IMaskInput mask="00000-000" {...props} />;
};

interface ScreenFields {
  passwordConfirmation?: string;
  adressNotNumber?: boolean;
}

const fieldsRequired = [
  "name",
  "password",
  "passwordConfirmation",
  "creciNumber",
  "creciState",
];

const Register = () => {
  const form = useForm<Doctor & ScreenFields>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      dateBirth: "",
      cpf: "",
      creciNumber: "",
      creciState: "",
      cep: "",
      city: "",
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
      state: "",
      idRealtor: null,
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
      ...fieldsRequired.reduce((acc, field) => {
        acc[field] = isNotEmpty(CAMPO_OBRIGATORIO);
        return acc;
      }, {} as Record<string, ReturnType<typeof isNotEmpty>>),
    },
  });

  const [adressNotNumberChecked, setAdressNotNumberChecked] = useState(false);

  const navigate = useNavigate();
  const loading = useContext(LoadingContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth?.loggedDoctor) {
      navigate("/");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const handleSubmit = (values: typeof form.values) => {
    const { passwordConfirmation, adressNotNumber, ...realtor } = values;
    let result = true;
    if (passwordConfirmation !== realtor.password) {
      form.setFieldError("passwordConfirmation", "As senhas não conferem");
      form.setFieldError("password", "As senhas não conferem");
      result = false;
    }

    if (!realtor.number && !adressNotNumber) {
      result = false;
    }

    if (result) {
      realtor.cpf = realtor.cpf?.replace(/\D/g, "");
      realtor.cep = realtor.cep?.replace(/\D/g, "");
      api
        .post("/register", realtor)
        .then(() => {
          showSuccess("Doutor cadastrado com sucesso!");
          navigate("/login");
        })
        .catch((error) => {
          showError(error.response.data.error);
        });
    }
  };

  const setAdress = (e: any) => {
    const cepFmt = e.target.value.replace("-", "");
    if (cepFmt.length === 8) {
      liberarFocoInput();
      loading?.show();
      api
        .get(`/cep/${cepFmt}`)
        .then((response) => {
          loading?.hide();
          const { city, neighborhood, street, state } = response.data;
          form.setValues({ city, neighborhood, street, state });
        })
        .catch(() => {
          loading?.hide();
          showError("CEP não encontrado");
          form.setValues({ city: "", neighborhood: "", street: "", state: "" });
        });
    }
  };

  const changeAdressNotNumber = (e: any) => {
    setAdressNotNumberChecked(e.currentTarget.checked);
    form.setFieldValue("number", "S/N");
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
        withAsterisk
        label="Senha"
        key={form.key("password")}
        {...form.getInputProps("password")}
        maxLength={50}
      />
      <PasswordInput
        withAsterisk
        label="Confirmar senha"
        key={form.key("passwordConfirmation")}
        {...form.getInputProps("passwordConfirmation")}
        maxLength={50}
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
        label="Número do CRECI"
        key={form.key("creciNumber")}
        {...form.getInputProps("creciNumber")}
        maxLength={20}
      />
      {/* <Dropdown
        withAsterisk
        label="UF CRECI"
        options={UF_ENUM_VALUES}
        id="creciState"
        form={form}
      /> */}
      <NumberInput
        label="Id de indicação"
        key={form.key("idRealtor")}
        {...form.getInputProps("idRealtor")}
        maxLength={9}
        allowNegative={false}
        hideControls
      />
      <TextInput
        withAsterisk
        label="CEP"
        component={IMaskInputCEPWrapper}
        key={form.key("cep")}
        {...form.getInputProps("cep")}
        onInput={setAdress}
      />
      {/* <Dropdown
        withAsterisk
        label="UF"
        options={UF_ENUM_VALUES}
        id="state"
        form={form}
        disabled
      /> */}
      <TextInput
        withAsterisk
        label="Cidade"
        key={form.key("city")}
        {...form.getInputProps("city")}
        maxLength={80}
        disabled
      />
      <TextInput
        withAsterisk
        label="Bairro"
        key={form.key("neighborhood")}
        {...form.getInputProps("neighborhood")}
        maxLength={150}
        disabled
      />
      <TextInput
        withAsterisk
        label="Rua"
        key={form.key("street")}
        {...form.getInputProps("street")}
        maxLength={150}
        disabled
      />
      <TextInput
        label="Número"
        key={form.key("number")}
        {...form.getInputProps("number")}
        maxLength={30}
        disabled={adressNotNumberChecked}
      />
      <TextInput
        label="Complemento"
        key={form.key("complement")}
        {...form.getInputProps("complement")}
        maxLength={150}
      />
      <Checkbox
        mt="md"
        label="Endereço sem número"
        key={form.key("adressNotNumber")}
        {...form.getInputProps("adressNotNumber", { type: "checkbox" })}
        onChange={changeAdressNotNumber}
        checked={adressNotNumberChecked}
      />
      <Link to="/login">Ja possui conta? Faça login</Link>
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

export default Register;
