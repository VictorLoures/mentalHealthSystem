import { Address } from "./Address";
import { Doctor } from "./Doctor";

export interface Patient {
  id?: number;
  name?: string;
  email?: string;
  phoneNumber?: string;
  dateBirth?: string;
  cpf?: string;
  minor?: boolean;
  nameResponsible?: string;
  phoneNumberResponsible?: string;
  doctor?: Doctor;
  address?: Address;
  createdAt?: string;
}
