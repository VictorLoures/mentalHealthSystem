import { parse } from "date-fns";

export const parseDateBr = (dateStr: string): Date => {
  const parsedDate = parse(dateStr, "dd/MM/yyyy", new Date());
  parsedDate.setHours(12);
  return parsedDate;
};
