import { useContext, useState } from "react";
import { Checkbox, Divider, TextInput } from "@mantine/core";
import api from "../api/api";
import { IMaskInput } from "react-imask";
import { LoadingContext } from "../context/LoadingContext";
import { liberarFocoInput, showError } from "../utils/util";

const IMaskInputCEPWrapper = (props: any) => {
  return <IMaskInput mask="00000-000" {...props} />;
};

interface AddressComponentProps {
  form?: any;
}

const AddressComponent = ({ form }: AddressComponentProps) => {
  const [adressNotNumberChecked, setAdressNotNumberChecked] = useState(false);
  const loading = useContext(LoadingContext);

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
        .catch((err) => {
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
    <>
      <h4>Endereço</h4>
      <Divider my="md" />

      <TextInput
        withAsterisk
        label="CEP"
        component={IMaskInputCEPWrapper}
        key={form.key("cep")}
        {...form.getInputProps("cep")}
        onInput={setAdress}
      />
      <TextInput
        withAsterisk
        label="UF"
        key={form.key("state")}
        {...form.getInputProps("state")}
        disabled
      />
      <TextInput
        withAsterisk
        label="Cidade"
        key={form.key("city")}
        {...form.getInputProps("city")}
        disabled
      />
      <TextInput
        withAsterisk
        label="Bairro"
        key={form.key("neighborhood")}
        {...form.getInputProps("neighborhood")}
        disabled
      />
      <TextInput
        withAsterisk
        label="Rua"
        key={form.key("street")}
        {...form.getInputProps("street")}
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
    </>
  );
};

export default AddressComponent;
