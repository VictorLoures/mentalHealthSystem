import { Doctor } from "../model/Doctor";
import client from "../prismaConfig";
import { hash } from "bcryptjs";

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
    const passwordHash = await hash(doctor.password, 8);
    const { id, consultations, patients, address, ...dataSave } = doctor;
    const data = client.doctor.create({
      data: {
        ...dataSave,
        dateBirth: new Date(doctor.dateBirth),
        password: passwordHash,
        address: {
          connect: { id: Number(doctor.address.id) },
        },
      },
    });

    return data;
  }
}
