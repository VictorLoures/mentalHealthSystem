import client from "../prismaConfig";
import { Patient } from "../model/Patient";
import { parseDateBr } from "../util/util";
import { Repository } from "typeorm";
import { PatientDTO } from "../dto/PatientDTO";
import { AppDataSource } from "../../ormconfig";
import { validateField } from "./ServiceUtil";

export default class PatientService {
  private readonly repo: Repository<Patient>;

  constructor() {
    this.repo = AppDataSource.getRepository(Patient);
  }

  async findById(idPatient: number) {
    return this.repo.findOneBy({ id: idPatient });
  }

  async findByAllByDoctorId(idDoctor: number) {
    return this.repo.find({
      where: { doctor: { id: idDoctor } },
    });
  }

  async create(patientDTO: PatientDTO) {
    const errors: string[] = [];
    await validateField(
      "email",
      patientDTO.email,
      "e-mail",
      errors,
      false,
      null,
      this.repo
    );
    await validateField(
      "cpf",
      patientDTO.cpf,
      "CPF",
      errors,
      false,
      null,
      this.repo
    );
    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }

    const patient = this.repo.create(patientDTO);
    patient.dateBirth = parseDateBr(patientDTO.dateBirth);
    return this.repo.save(patient);
  }

  async update(patientDTO: PatientDTO) {
    const errors: string[] = [];
    const idPatient = Number(patientDTO.id);
    await validateField(
      "email",
      patientDTO.email,
      "e-mail",
      errors,
      true,
      idPatient,
      this.repo
    );
    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }
    const patient = this.repo.create(patientDTO);
    patient.dateBirth = parseDateBr(patientDTO.dateBirth);
    return this.repo.save(patient);
  }

  async findPatientByQuery(doctorId: string, query: string) {
    return await this.repo
      .createQueryBuilder("patient")
      .where("patient.doctorId = :doctorId", { doctorId })
      .andWhere(
        "(patient.name ILIKE :query OR patient.email ILIKE :query OR patient.cpf ILIKE :query)",
        { query: `%${query}%` }
      )
      .select(["patient.id", "patient.name", "patient.cpf", "patient.email"])
      .getMany();
  }
}
