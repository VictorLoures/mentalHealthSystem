export interface AdressDTO {
  id: number;
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  complement?: string;
  number?: string;
}
