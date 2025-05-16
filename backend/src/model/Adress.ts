import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

export interface Adress {
  id: number;
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  complement?: string;
  number?: string;
}
