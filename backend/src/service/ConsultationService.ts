import { Consultation } from "../model/Consultation";
import { parseDateAndHourBr } from "../util/util";
import { formatInTimeZone } from "date-fns-tz";
import { Between, Repository } from "typeorm";
import { ConsultationDTO } from "../dto/ConsultationDTO";
import { AppDataSource } from "../../ormconfig";

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
    const consultation: Consultation = this.repo.create(consultationDTO);
    consultation.day = parseDateAndHourBr(consultationDTO.day);
    const data = await this.repo.save(consultation);
    formatHourSelect(data);
    return data;
  }

  async delete(idConsultation: number) {
    return this.repo.delete(idConsultation);
  }

  async findAllByDoctorIdInDay(idDoctor: number) {
    const now = new Date();
    const start = createDate(now, 0);
    const end = createDate(now, 1);

    const consultations = await this.repo.find({
      where: {
        user: { id: idDoctor },
        day: Between(start, end),
      },
      order: {
        day: "ASC",
      },
      relations: ["patient"],
    });
    formatHourSelect(consultations);

    return consultations;
  }

  async payConsultation(idConsultation: number) {
    this.repo.update(idConsultation, { paid: true });
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
