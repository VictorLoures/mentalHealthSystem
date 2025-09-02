import { DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const config: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "masterkey",
  database: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: [__dirname + "/model/*.{ts,js}"], // rever
  migrations: ["src/migrations/**/*.ts"],
};

export default config;
