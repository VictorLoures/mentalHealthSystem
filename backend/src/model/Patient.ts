import { Adress } from "./Adress";
import { Consultation } from "./Consultation";
import { Doctor } from "./Doctor";

export interface Patient {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  dateBirth: Date;
  cpf: string;
  minor: boolean;
  nameResponsible?: string;
  phoneNumberResponsible?: string;
  address: Adress;
  consultations: Consultation[];
  doctor: Doctor;
}
