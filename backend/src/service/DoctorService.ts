import { Doctor } from "../model/Doctor";
import { hash } from "bcryptjs";
import { parseDateBr } from "../util/util";
import { Repository } from "typeorm";
import { DoctorDTO } from "../dto/DoctorDTO";
import { AppDataSource } from "../../ormconfig";
import { validateField } from "./ServiceUtil";

export default class DoctorService {
  private readonly repo: Repository<Doctor>;

  constructor() {
    this.repo = AppDataSource.getRepository(Doctor);
  }

  async findAll() {
    return this.repo.find();
  }

  async findById(idDoctor: number) {
    return this.repo.findOneBy({ id: idDoctor });
  }

  async create(doctorDTO: DoctorDTO) {
    const errors: string[] = [];
    await validateField(
      "email",
      doctorDTO.email,
      "e-mail",
      errors,
      false,
      null,
      this.repo
    );
    await validateField(
      "cpf",
      doctorDTO.cpf,
      "CPF",
      errors,
      false,
      null,
      this.repo
    );
    await validateField(
      "crpNumber",
      doctorDTO.crpNumber,
      "Número do CRP",
      errors,
      false,
      null,
      this.repo
    );

    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }

    const doctor: Doctor = this.repo.create(doctorDTO);
    doctor.password = await hash(doctorDTO.password, 8);
    doctor.dateBirth = parseDateBr(doctorDTO.dateBirth);
    return await this.repo.save(doctor);
  }

  async update(doctorDTO: DoctorDTO) {
    const errors: string[] = [];
    const idDoctor = Number(doctorDTO.id);
    await validateField(
      "email",
      doctorDTO.email,
      "e-mail",
      errors,
      true,
      idDoctor,
      this.repo
    );
    await validateField(
      "cpf",
      doctorDTO.cpf,
      "CPF",
      errors,
      true,
      idDoctor,
      this.repo
    );
    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }

    const doctor: Doctor = this.repo.create(doctorDTO);
    if (doctorDTO.password) {
      doctor.password = await hash(doctorDTO.password, 8);
    }
    doctor.dateBirth = parseDateBr(doctorDTO.dateBirth);
    return await this.repo.save(doctor);
  }
}
