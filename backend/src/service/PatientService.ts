import client from "../prismaConfig";
import AddressService from "./AddressService";
import { Patient } from "../model/Patient";
import { parseDateBr } from "../util/util";

const DEFAULT_SELECT_OBJ = {
  id: true,
  name: true,
  email: true,
  phoneNumber: true,
  dateBirth: true,
  cpf: true,
  minor: true,
  nameResponsible: true,
  phoneNumberResponsible: true,
  address: true,
  consultations: true,
  doctor: true,
  createdAt: true,
};

export default class PatientService {
  async findById(idPatient: number) {
    return client.patient.findMany({
      where: { id: idPatient },
      select: DEFAULT_SELECT_OBJ,
    });
  }

  async findByAllByDoctorId(idDoctor: number) {
    return client.patient.findMany({
      where: { doctor_id: idDoctor },
      select: DEFAULT_SELECT_OBJ,
    });
  }

  async create(patient: Patient) {
    const errors: string[] = [];
    await validateField("email", patient.email, "e-mail", errors);
    await validateField("cpf", patient.cpf, "CPF", errors);
    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }

    const idAdress = (await new AddressService().create(patient.address)).id;
    const { id, address, consultations, doctor, ...dataSave } = patient;
    const data = client.patient.create({
      data: {
        ...dataSave,
        dateBirth: parseDateBr(patient.dateBirth),
        doctor: {
          connect: { id: Number(doctor.id) },
        },
        address: {
          connect: { id: idAdress },
        },
      },
    });
    return data;
  }

  async update(patient: Patient) {
    const errors: string[] = [];
    await validateField("email", patient.email, "e-mail", errors);
    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }
    const { id, address, consultations, doctor, ...dataSave } = patient;
    new AddressService().update(patient.address);
    const data = client.patient.update({
      where: {
        id: Number(id),
      },
      data: {
        ...dataSave,
        dateBirth: parseDateBr(patient.dateBirth),
      },
    });

    return data;
  }
}

async function validateField(
  fieldBd: any,
  field: any,
  fieldMessage: string,
  errors: string[]
) {
  const whereObj: any = {
    [fieldBd]: field,
  };
  let existentDoctor = await client.patient.findFirst({
    where: whereObj,
    select: {
      id: true,
    },
  });
  if (existentDoctor) {
    errors.push(`Já existe um paciente cadastardo com este ${fieldMessage}`);
  }
}
