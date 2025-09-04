import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1756949182979 implements MigrationInterface {
    name = 'InitSchema1756949182979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_11f8e4427b8128da5cdfbeac909"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_3a86118a85d8fed2f3bf0181264"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_6636aefca0bdad8933c7cc3e394"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_9e4aae494b9d607dd7476c49f03"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "dateBirth"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "UQ_d1206b00842f789e35c7c5baf61"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "minor"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "nameResponsible"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "phoneNumberResponsible"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "UQ_11f8e4427b8128da5cdfbeac909"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "day"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "paid"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "online"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "day" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "price" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "paid" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "online" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "patientId" integer`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "name" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "phoneNumber" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "dateBirth" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "cpf" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "UQ_d1206b00842f789e35c7c5baf61" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "minor" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "nameResponsible" character varying(150)`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "phoneNumberResponsible" character varying(15)`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "addressId" integer`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "UQ_11f8e4427b8128da5cdfbeac909" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "doctorId" integer`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_6636aefca0bdad8933c7cc3e394" FOREIGN KEY ("userId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_9e4aae494b9d607dd7476c49f03" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_11f8e4427b8128da5cdfbeac909" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_3a86118a85d8fed2f3bf0181264" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_3a86118a85d8fed2f3bf0181264"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_11f8e4427b8128da5cdfbeac909"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_9e4aae494b9d607dd7476c49f03"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_6636aefca0bdad8933c7cc3e394"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "UQ_11f8e4427b8128da5cdfbeac909"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "phoneNumberResponsible"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "nameResponsible"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "minor"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "UQ_d1206b00842f789e35c7c5baf61"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "dateBirth"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "online"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "paid"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "day"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "patientId" integer`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "online" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "paid" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "price" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "day" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "doctorId" integer`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "addressId" integer`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "UQ_11f8e4427b8128da5cdfbeac909" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "phoneNumberResponsible" character varying(15)`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "nameResponsible" character varying(150)`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "minor" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "cpf" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "UQ_d1206b00842f789e35c7c5baf61" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "dateBirth" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "phoneNumber" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "name" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_9e4aae494b9d607dd7476c49f03" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_6636aefca0bdad8933c7cc3e394" FOREIGN KEY ("userId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_3a86118a85d8fed2f3bf0181264" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_11f8e4427b8128da5cdfbeac909" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
