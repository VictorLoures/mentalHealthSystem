import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

export interface Adress {
  id: number;
  cep: String;
  state: String;
  city: String;
  street: String;
  neighborhood: String;
  complement?: String;
  number?: String;
  user?: Doctor;
  patient?: Patient;
}
