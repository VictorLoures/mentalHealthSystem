import { Address } from "./Address";

export interface Doctor {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  dateBirth?: string;
  cpf?: string;
  crpNumber?: string;
  address?: Address;
  createdAt?: string;
}
