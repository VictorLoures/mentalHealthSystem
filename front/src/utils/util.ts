import { notifications } from "@mantine/notifications";
import { toZonedTime, format } from "date-fns-tz";

export const TOKEN = "doctor";

export const CAMPO_OBRIGATORIO = "Campo obrigatório";

export const isValidCPF = (cpf: string): boolean => {
  if (!cpf) return false;

  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;

  return rest === parseInt(cpf[10]);
};

export const isOver18 = (birthDateStr: string): boolean => {
  if (!birthDateStr || birthDateStr.length !== 10) return false;

  const [day, month, year] = birthDateStr.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  return birthDate <= eighteenYearsAgo;
};

export const liberarFocoInput = () => {
  const input: any = document.activeElement;
  if (input) {
    input.blur();
  }
};

export const showSuccess = (title: string) => {
  notifications.show({
    title,
    message: "",
    color: "green",
    position: "top-right",
  });
};

export const showError = (title: string) => {
  notifications.show({
    title,
    message: "",
    color: "red",
    position: "top-right",
  });
};

export const formatDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
};

export const formatDateWhitHourToSend = (isoDate: any): any => {
  const timeZone = "America/Sao_Paulo";
  const zonedDate = toZonedTime(isoDate, timeZone);
  return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", { timeZone: "UTC" });
};

export const formatCep = (cep: string) => {
  return `${cep.substring(0, 5)}-${cep.substring(5, 8)}`;
};

export const formatToBRL = (value: number): string => {
  return (parseFloat(value.toString()) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
