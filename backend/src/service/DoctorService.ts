import { Doctor } from "../model/Doctor";
import client from "../prismaConfig";
import { hash } from "bcryptjs";
import AddressService from "./AddressService";

const DEFAULT_SELECT_OBJ = {
  id: true,
  name: true,
  email: true,
  phoneNumber: true,
  dateBirth: true,
  cpf: true,
  crpNumber: true,
  createdAt: true,
  address: true,
  consultations: true,
  patients: true,
};

export default class DoctorService {
  async findAll() {
    return client.doctor.findMany({
      select: DEFAULT_SELECT_OBJ,
    });
  }

  async findById(idDoctor: number) {
    return client.doctor.findMany({
      where: { id: idDoctor },
      select: DEFAULT_SELECT_OBJ,
    });
  }

  async create(doctor: Doctor) {
    //todo validations
    const idAdress = (await new AddressService().create(doctor.address)).id;
    const passwordHash = await hash(doctor.password, 8);
    const { id, consultations, patients, address, ...dataSave } = doctor;
    const data = client.doctor.create({
      data: {
        ...dataSave,
        dateBirth: new Date(doctor.dateBirth),
        password: passwordHash,
        address: {
          connect: { id: idAdress },
        },
      },
    });

    return data;
  }

  async update(doctor: Doctor) {
    //todo validations
    const { id, consultations, patients, address, password, ...dataSave } =
      doctor;
    new AddressService().update(doctor.address);
    const data = client.doctor.update({
      where: {
        id: Number(id),
      },
      data: {
        ...dataSave,
        dateBirth: new Date(doctor.dateBirth),
      },
    });

    return data;
  }
}
