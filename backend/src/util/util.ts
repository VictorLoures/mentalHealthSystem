import { parse } from "date-fns";
import dayjs from "../config/daysjs";

export const parseDateBr = (dateStr: string): Date => {
  const parsedDate = parse(dateStr, "dd/MM/yyyy", new Date());
  parsedDate.setHours(12);
  return parsedDate;
};

export const parseDateAndHourBr = (dateStr: string): Date => {
  return dayjs(dateStr, "DD/MM/YYYY HH:mm").toDate();
};
