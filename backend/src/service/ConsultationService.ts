import client from "../prismaConfig";
import { Consultation } from "../model/Consultation";
import { parseDateAndHourBr } from "../util/util";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

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
    const data = await client.consultation.findFirst({
      where: { id: idConsultation },
      select: DEFAULT_SELECT_OBJ,
    });
    formatHourSelect(data);
    return data;
  }

  async findAllByDoctorId(idDoctor: number) {
    const data = await client.consultation.findMany({
      where: { doctor_id: idDoctor },
      select: DEFAULT_SELECT_OBJ,
    });
    console.log(data);
    formatHourSelect(data);
    console.log(data);
    return data;
  }

  async findAllByPatientId(idPatient: number) {
    const data = await client.consultation.findMany({
      where: { patient_id: idPatient },
      select: DEFAULT_SELECT_OBJ,
    });
    formatHourSelect(data);
    return data;
  }

  async create(consultation: Consultation) {
    const { id, user, patient, ...dataSave } = consultation;
    const data = await client.consultation.create({
      data: {
        ...dataSave,
        day: parseDateAndHourBr(consultation.day),
        user: {
          connect: { id: Number(user.id) },
        },
        patient: {
          connect: { id: Number(patient.id) },
        },
      },
    });
    formatHourSelect(data);
    return data;
  }

  async update(consultation: Consultation) {
    const { id, user, patient, ...dataSave } = consultation;
    const data = await client.consultation.update({
      where: {
        id: Number(id),
      },
      data: {
        ...dataSave,
        day: parseDateAndHourBr(consultation.day),
      },
    });
    formatHourSelect(data);
    return data;
  }

  async delete(idConsultation: number) {
    return client.consultation.delete({
      where: { id: idConsultation },
    });
  }

  async findAllByDoctorIdInDay(idDoctor: number) {
    const now = new Date();
    const start = createDate(now, 0);
    const end = createDate(now, 1);

    const consultations = await client.consultation.findMany({
      where: {
        doctor_id: idDoctor,
        day: {
          gte: start,
          lt: end,
        },
      },
      select: DEFAULT_SELECT_OBJ,
    });
    formatHourSelect(consultations);

    return consultations;
  }
}

const formatHourSelect = (data: any) => {
  if (data && data.length > 0) {
    data.forEach((it) => {
      const date = new Date(it.day);
      it.day = formatInTimeZone(date, "UTC", "dd/MM/yyyy HH:mm");
    });
  }
};

const createDate = (now, day) => {
  return new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + day,
      0,
      0,
      0,
      0
    )
  );
};
