import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import {
  CAMPO_OBRIGATORIO,
  formatDateWhitHourToSend,
  showError,
} from "../utils/util";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Consultation } from "../model/Consultation";
import { create, update } from "../api/api.uti";
import { DateTimePicker } from "@mantine/dates";
import api from "../api/api";
import PatientSelect from "../components/PatientSelect";

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

  const [selectedPatientId, setSelectedPatientId] = useState<string | null>("");

  useEffect(() => {
    if (id) {
      api.get(`/findConsultationById/${id}`).then((response) => {
        if (response.data) {
          const data = response.data;
          form.setValues({
            id: data.id,
            day: new Date(data.day.replace("Z", "")).toString(),
            paid: data.paid,
            online: data.online,
          });
          formatPrice(data.price);
          setSelectedPatientId(data.patient?.id?.toString());
        } else {
          showError("Ocorreu um erro inesperado!");
        }
      });
    } else {
      formatPrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values: typeof form.values) => {
    if (selectedPatientId) {
      const { id: idConsultation, price, ...consultation } = values;

      const priceAdjusted = price?.toString()?.replace(/\D/g, "");

      const consultationToSend: Consultation = {
        ...consultation,
        price: Number(priceAdjusted),
        user: {
          id: auth?.loggedDoctor?.id,
        },
        patient: {
          id: Number(selectedPatientId),
        },
      };

      consultationToSend.day = formatDateWhitHourToSend(consultationToSend.day);
      if (id) {
        consultationToSend.id = idConsultation;
        update(
          "/updateConsultation",
          consultationToSend,
          "Consulta atualizada com sucesso!",
          navigate,
          "/consultations"
        );
      } else {
        create(
          "/createConsultation",
          consultationToSend,
          "Consulta cadastrada com sucesso!",
          navigate,
          "/consultations"
        );
      }
    } else {
      showError("O campo 'Paciente' é obrigatório");
    }
  };

  const formatPrice = (price: any = null) => {
    const value = price ? (Number(price) ? price : price.target.value) : "0";
    let priceFmt = value.replace(/\D/g, "");
    priceFmt = (parseFloat(priceFmt) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    form.setFieldValue(
      "price",
      priceFmt.includes("NaN") ? "R$ 0,00" : priceFmt
    );
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit, (values) => console.log(values))}
    >
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
      <PatientSelect
        setSelectedPatientId={setSelectedPatientId}
        selectedPatientId={selectedPatientId}
        form={form}
      />
      <DateTimePicker
        label="Dia e hora"
        placeholder="Dia e hora da consulta"
        key={form.key("day")}
        {...form.getInputProps("day")}
      />
      <TextInput
        withAsterisk
        label="Preço"
        key={form.key("price")}
        {...form.getInputProps("price")}
        maxLength={20}
        onChange={formatPrice}
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
      <Group justify="flex-end" mt="md">
        <Button color="red" onClick={() => navigate("/consultations")}>
          Cancelar
        </Button>
        <Button type="submit">{!id ? "Cadastrar" : "Salvar"}</Button>
      </Group>
    </form>
  );
};

export default CreateConsultation;
