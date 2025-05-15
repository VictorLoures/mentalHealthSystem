import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import api from "../api/api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { showError, TOKEN } from "../utils/util";
import { LoadingContext } from "../context/LoadingContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const auth = useContext(AuthContext);
  const loading = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.loggedDoctor) {
      navigate("/");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      login: "",
      password: "",
    },
    validate: {
      login: (value: string) =>
        value.trim().length === 0 ? "O campo Login é obrigatório" : null,
      password: (value: string) =>
        value.trim().length === 0 ? "O campo Senha é obrigatório" : null,
    },
  });

  const sendLogin = (values: any) => {
    loading?.show();
    api
      .post("/login", { login: values.login, password: values.password })
      .then((response) => {
        loading?.hide();
        const { token, ...data } = response.data;
        localStorage.setItem(TOKEN, token);
        auth?.setLoggedDoctor(data);
      })
      .catch((error) => {
        loading?.hide();
        showError(error.response.data.error);
      });
  };

  return (
    <form onSubmit={form.onSubmit(sendLogin)}>
      <TextInput
        withAsterisk
        label="Email / CPF / Número do CRP"
        key={form.key("login")}
        {...form.getInputProps("login")}
        maxLength={150}
      />
      <PasswordInput
        withAsterisk
        label="Senha"
        key={form.key("password")}
        {...form.getInputProps("password")}
        maxLength={50}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Login</Button>
      </Group>
      <Link to="/register">Não possui conta? Clique aqui para criar</Link>
    </form>
  );
};

export default Login;
