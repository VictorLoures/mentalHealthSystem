import { AdressDTO } from "./AdressDTO";
import { ConsultationDTO } from "./ConsultationDTO";
import { DoctorDTO } from "./DoctorDTO";

export interface PatientDTO {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  dateBirth: string;
  cpf: string;
  minor: boolean;
  nameResponsible?: string;
  phoneNumberResponsible: string;
  address: AdressDTO;
  consultations: ConsultationDTO[];
  doctor: DoctorDTO;
}
