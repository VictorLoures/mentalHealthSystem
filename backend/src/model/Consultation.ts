import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

@Entity({ name: "patient" })
export class Consultation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  day!: Date;

  @Column({ type: "bigint" })
  price!: number;

  @Column({ type: "boolean" })
  paid!: boolean;

  @Column({ type: "boolean" })
  online!: boolean;

  @ManyToOne(() => Doctor, { cascade: true, nullable: true })
  @JoinColumn()
  user?: Doctor;

  @ManyToOne(() => Patient, { cascade: true, nullable: true })
  @JoinColumn()
  patient?: Patient;
}
