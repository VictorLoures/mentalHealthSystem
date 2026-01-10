import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Address } from "./Adress";
import { Consultation } from "./Consultation";
import { Patient } from "./Patient";

@Entity({ name: "doctor" })
export class Doctor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150 })
  name!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "varchar", length: 15 })
  phoneNumber!: string;

  @Column({ type: "date" })
  dateBirth!: Date;

  @Column({ type: "varchar", length: 11, unique: true })
  cpf!: string;

  @Column({ type: "varchar", length: 20, unique: true })
  crpNumber!: string;

  @OneToOne(() => Address, { cascade: true, nullable: true })
  @JoinColumn()
  address?: Address;

  @OneToMany(() => Consultation, (consultation) => consultation.user)
  consultations!: Consultation[];

  @OneToMany(() => Patient, (patient) => patient.doctor, {
    cascade: ["insert", "update"],
  })
  @JoinTable()
  patients?: Patient[];
}
