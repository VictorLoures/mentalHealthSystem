import { Adress } from "../model/Adress";
import client from "../prismaConfig";

export default class AddressService {
  async create(adress: Adress) {
    const { id, user, patient, ...dataAdress } = adress;
    const idAdress = client.address.create({
      data: {
        ...dataAdress,
      },
      select: {
        id: true,
      },
    });

    return idAdress;
  }

  async update(adress: Adress) {
    const { id, user, patient, ...dataAdress } = adress;
    const idAdress = client.address.update({
      where: {
        id: Number(id),
      },
      data: {
        ...dataAdress,
      },
    });

    return idAdress;
  }
}
