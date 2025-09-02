import {
  Column,
  Entity,
  JoinColumn,
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
  dateBirth!: string;

  @Column({ type: "varchar", length: 11, unique: true })
  cpf!: string;

  @Column({ type: "varchar", length: 20, unique: true })
  crpNumber!: string;

  @OneToOne(() => Address, { cascade: true, nullable: true })
  @JoinColumn()
  address?: Address;

  @OneToMany(() => Consultation, (consultation) => consultation.user)
  consultations!: Consultation[];

  @OneToOne(() => Doctor, { cascade: true, nullable: true })
  @JoinColumn()
  doctor?: Doctor;
}
