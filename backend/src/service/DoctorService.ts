import { Doctor } from "../model/Doctor";
import client from "../prismaConfig";
import { hash } from "bcryptjs";
import AddressService from "./AddressService";
import { parseDateBr } from "../util/util";

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
    return client.doctor.findFirst({
      where: { id: idDoctor },
      select: { ...DEFAULT_SELECT_OBJ, patients: false, consultations: false },
    });
  }

  async create(doctor: Doctor) {
    const errors: string[] = [];
    await validateField("email", doctor.email, "e-mail", errors);
    await validateField("cpf", doctor.cpf, "CPF", errors);
    await validateField("crpNumber", doctor.crpNumber, "Número do CRP", errors);

    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }

    const idAdress = (await new AddressService().create(doctor.address)).id;
    const passwordHash = await hash(doctor.password, 8);
    const { id, consultations, patients, address, ...dataSave } = doctor;
    const data = client.doctor.create({
      data: {
        ...dataSave,
        dateBirth: parseDateBr(doctor.dateBirth),
        password: passwordHash,
        address: {
          connect: { id: idAdress },
        },
      },
    });

    return data;
  }

  async update(doctor: Doctor) {
    const errors: string[] = [];
    const { id, consultations, patients, address, password, ...dataSave } =
      doctor;
    const idDoctor = Number(id);
    await validateField(
      "email",
      doctor.email,
      "e-mail",
      errors,
      true,
      idDoctor
    );
    await validateField("cpf", doctor.cpf, "CPF", errors, true, idDoctor);
    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }

    const dataToPersist: any = {
      ...dataSave,
      dateBirth: parseDateBr(doctor.dateBirth),
    };
    if (password) {
      const passwordHash = await hash(doctor.password, 8);
      dataToPersist.password = passwordHash;
    }

    new AddressService().update(doctor.address);
    const data = client.doctor.update({
      where: {
        id: idDoctor,
      },
      data: dataToPersist,
    });

    return data;
  }
}

async function validateField(
  fieldBd: any,
  field: any,
  fieldMessage: string,
  errors: string[],
  isEdit: boolean = false,
  id: number = null
) {
  const whereObj: any = {
    [fieldBd]: field,
  };
  if (isEdit && id) {
    whereObj.id = {
      not: id,
    };
  }
  let existentDoctor = await client.doctor.findFirst({
    where: whereObj,
    select: {
      id: true,
    },
  });
  if (existentDoctor) {
    errors.push(`Já existe um pisicólogo cadastrado com este ${fieldMessage}`);
  }
}
