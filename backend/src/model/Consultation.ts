import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

export interface Consultation {
  id: number;
  day: Date;
  price: number;
  paid: boolean;
  online: boolean;
  user: Doctor;
  patient: Patient;
  patients?: Patient[];
}
