import client from "../prismaConfig";
import { Consultation } from "../model/Consultation";
import { parseDateAndHourBr } from "../util/util";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { Repository } from "typeorm";
import { ConsultationDTO } from "../dto/ConsultationDTO";
import { AppDataSource } from "../server";

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
  private readonly repo: Repository<Consultation>;

  constructor() {
    this.repo = AppDataSource.getRepository(Consultation);
  }

  async findById(idConsultation: number) {
    const data = await this.repo.findOne({
      where: { id: idConsultation },
    });
    formatHourSelect(data);
    return data;
  }

  async findAllByDoctorId(idDoctor: number) {
    const data = await this.repo.findOne({
      where: { user: { id: idDoctor } },
    });
    formatHourSelect(data);
    return data;
  }

  async findAllByPatientId(idPatient: number) {
    const data = await this.repo.findOne({
      where: { patient: { id: idPatient } },
    });
    formatHourSelect(data);
    return data;
  }

  async createOrUpdate(consultationDTO: ConsultationDTO) {
    //vr sobre data, na teoria ja relaciona usuario e paciente
    const consultation = this.repo.create(consultationDTO);
    const data = await this.repo.save(consultation);
    formatHourSelect(data);
    return data;
  }

  // async create(consultation: Consultation) {
  //   const { id, user, patient, ...dataSave } = consultation;
  //   const data = await client.consultation.create({
  //     data: {
  //       ...dataSave,
  //       day: parseDateAndHourBr(consultation.day),
  //       user: {
  //         connect: { id: Number(user.id) },
  //       },
  //       patient: {
  //         connect: { id: Number(patient.id) },
  //       },
  //     },
  //   });
  //   formatHourSelect(data);
  //   return data;
  // }

  // async update(consultation: Consultation) {
  //   const { id, user, patient, ...dataSave } = consultation;
  //   const data = await client.consultation.update({
  //     where: {
  //       id: Number(id),
  //     },
  //     data: {
  //       ...dataSave,
  //       day: parseDateAndHourBr(consultation.day),
  //     },
  //   });
  //   formatHourSelect(data);
  //   return data;
  // }

  async delete(idConsultation: number) {
    return this.repo.delete(idConsultation);
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
      orderBy: {
        day: "asc",
      },
      select: DEFAULT_SELECT_OBJ,
    });
    formatHourSelect(consultations);

    return consultations;
  }

  async payConsultation(idConsultation: number) {
    await client.consultation.update({
      where: {
        id: Number(idConsultation),
      },
      data: {
        paid: true,
      },
    });
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
