import { AdressDTO } from "./AdressDTO";
import { ConsultationDTO } from "./ConsultationDTO";
import { PatientDTO } from "./PatientDTO";

export interface DoctorDTO {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateBirth: string;
  cpf: string;
  crpNumber: string;
  address: AdressDTO;
  consultations: ConsultationDTO[];
  patients?: PatientDTO[];
}
