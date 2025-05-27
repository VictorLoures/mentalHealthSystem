import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

export interface Consultation {
  id: number;
  day: string;
  price: number;
  paid: boolean;
  online: boolean;
  user: Doctor;
  patient: Patient;
}
