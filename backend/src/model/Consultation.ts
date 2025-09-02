import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

@Entity({ name: "patient" })
export class Consultation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  day!: string;

  @Column({ type: "bigint" })
  price!: number;

  @Column({ type: "boolean", length: 15 })
  paid!: boolean;

  @Column({ type: "boolean" })
  online!: boolean;

  @OneToOne(() => Doctor, { cascade: true, nullable: true })
  @JoinColumn()
  user?: Doctor;

  @OneToOne(() => Patient, { cascade: true, nullable: true })
  @JoinColumn()
  patient?: Patient;
}
