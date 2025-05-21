import { Button, Checkbox, Group, NumberInput, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import { CAMPO_OBRIGATORIO, showError } from "../utils/util";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Consultation } from "../model/Consultation";
import { create, update } from "../api/api.uti";
import { DateTimePicker } from "@mantine/dates";
import api from "../api/api";

const CreateConsultation = () => {
  const form = useForm<Consultation>({
    initialValues: {
      day: "",
      price: 0,
      paid: false,
      online: false,
    },
    validateInputOnBlur: true,
    mode: "controlled",
    validate: {
      day: isNotEmpty(CAMPO_OBRIGATORIO),
      price: isNotEmpty(CAMPO_OBRIGATORIO),
    },
  });

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/findConsultationById/${id}`).then((response) => {
        if (response.data) {
          const data = response.data;
          console.log(data);
          form.setValues({
            id: data.id,
            day: data.day,
            price: data.price,
            paid: data.paid,
            online: data.online,
          });
        } else {
          showError("Ocorreu um erro inesperado!");
        }
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values: typeof form.values) => {
    const { id: idConsultation, ...consultation } = values;

    const consultationToSend: Consultation = {
      ...consultation,
      user: {
        id: auth?.loggedDoctor?.id,
      },
      patient: {
        id: 0,
      },
    };

    if (id) {
      consultationToSend.id = idConsultation;
      // update(
      //   "/updateConsultation",
      //   consultationToSend,
      //   "Consulta atualizada com sucesso!",
      //   navigate,
      //   "/consultations"
      // );
    } else {
      console.log(consultationToSend);
      // create(
      //   "/createConsultation",
      //   consultationToSend,
      //   "Consulta cadastrada com sucesso!",
      //   navigate,
      //   "/consultations"
      // );
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <h4>Cadastro de consulta</h4>
      <div style={{ display: "none" }}>
        <TextInput
          withAsterisk
          label="id"
          key={form.key("id")}
          {...form.getInputProps("id")}
          maxLength={150}
        />
      </div>
      <DateTimePicker
        label="Dia e hora"
        placeholder="Dia e hora da consulta"
        key={form.key("day")}
        {...form.getInputProps("day")}
      />
      <NumberInput
        withAsterisk
        label="Preço"
        prefix="R$ "
        key={form.key("price")}
        {...form.getInputProps("price")}
        maxLength={20}
      />
      <Checkbox
        mt="md"
        label="Já foi pago?"
        key={form.key("paid")}
        {...form.getInputProps("paid", { type: "checkbox" })}
      />
      <Checkbox
        mt="md"
        label="É presencial?"
        key={form.key("online")}
        {...form.getInputProps("online", { type: "checkbox" })}
      />
      {/* todo select patient */}
      <Group justify="flex-end" mt="md">
        <Button color="red" onClick={() => navigate("/consultations")}>
          Cancelar
        </Button>
        <Button type="submit">Cadastrar</Button>
      </Group>
    </form>
  );
};

export default CreateConsultation;
