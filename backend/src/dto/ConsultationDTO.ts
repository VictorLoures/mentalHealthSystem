import { DoctorDTO } from "./DoctorDTO";
import { PatientDTO } from "./PatientDTO";

export interface ConsultationDTO {
  id: number;
  day: string;
  price: number;
  paid: boolean;
  online: boolean;
  user: DoctorDTO;
  patient: PatientDTO;
}
