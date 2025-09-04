import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Adress";
import { Consultation } from "./Consultation";
import { Doctor } from "./Doctor";

@Entity({ name: "patient" })
export class Patient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 150 })
  name!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar", length: 15 })
  phoneNumber!: string;

  @Column({ type: "date" })
  dateBirth!: Date;

  @Column({ type: "varchar", length: 11, unique: true })
  cpf!: string;

  @Column({ type: "boolean" })
  minor!: boolean;

  @Column({ type: "varchar", length: 150, nullable: true })
  nameResponsible?: string;

  @Column({ type: "varchar", length: 15, nullable: true })
  phoneNumberResponsible?: string;

  @OneToOne(() => Address, { cascade: true, nullable: true })
  @JoinColumn()
  address?: Address;

  @OneToMany(() => Consultation, (consultation) => consultation.user)
  consultations?: Consultation[];

  @ManyToOne(() => Doctor, (doctor) => doctor.patients, {
    nullable: true,
    onDelete: "SET NULL",
  })
  doctor?: Doctor;
}
