import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "address" })
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 8 })
  cep!: string;

  @Column({ type: "varchar", length: 2 })
  state!: string;

  @Column({ type: "varchar", length: 80 })
  city!: string;

  @Column({ type: "varchar", length: 150 })
  street!: string;

  @Column({ type: "varchar", length: 150 })
  neighborhood!: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  complement?: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  number?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
