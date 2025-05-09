import { Adress } from "./Adress";
import { Consultation } from "./Consultation";
import { Patient } from "./Patient";

export interface Doctor {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateBirth: Date;
  cpf: string;
  crpNumber: string;
  address: Adress;
  consultations: Consultation[];
  patients?: Patient[];
}
