import client from "../prismaConfig";
import { Consultation } from "../model/Consultation";

const DEFAULT_SELECT_OBJ = {
  id: true,
  day: true,
  price: true,
  paid: true,
  online: true,
  user: true,
  patient: true,
  createdAt: true,
};

export default class ConsultationService {
  async findById(idConsultation: number) {
    return client.consultation.findFirst({
      where: { id: idConsultation },
      select: DEFAULT_SELECT_OBJ,
    });
  }

  async findAllByDoctorId(idDoctor: number) {
    return client.consultation.findMany({
      where: { doctor_id: idDoctor },
      select: DEFAULT_SELECT_OBJ,
    });
  }

  async findAllByPatientId(idPatient: number) {
    return client.consultation.findMany({
      where: { patient_id: idPatient },
      select: DEFAULT_SELECT_OBJ,
    });
  }

  async create(consultation: Consultation) {
    const { id, user, patient, ...dataSave } = consultation;
    const data = client.consultation.create({
      data: {
        ...dataSave,
        day: new Date(consultation.day),
        user: {
          connect: { id: Number(user.id) },
        },
        patient: {
          connect: { id: Number(patient.id) },
        },
      },
    });
    return data;
  }

  async update(consultation: Consultation) {
    const { id, user, patient, ...dataSave } = consultation;
    const data = client.consultation.update({
      where: {
        id: Number(id),
      },
      data: {
        ...dataSave,
        day: new Date(consultation.day),
      },
    });
    return data;
  }

  async delete(idConsultation: number) {
    return client.consultation.delete({
      where: { id: idConsultation },
    });
  }
}
