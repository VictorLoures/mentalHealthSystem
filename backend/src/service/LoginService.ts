import { LoginDTO } from "../dto/LoginDTO";
import { compare } from "bcryptjs";
import { decode, sign } from "jsonwebtoken";
import { AppDataSource } from "../../ormconfig";
import { Repository } from "typeorm";
import { Doctor } from "../model/Doctor";

export default class LoginService {
  private readonly repo: Repository<Doctor>;

  constructor() {
    this.repo = AppDataSource.getRepository(Doctor);
  }
  async login({ login, password }: LoginDTO) {
    const user = await this.repo.findOne({
      where: [{ email: login }, { cpf: login }, { crpNumber: login }],
    });

    if (!user) {
      throw new Error();
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error();
    }

    const token = sign(
      {
        cpf: user.cpf,
        email: user.email,
        name: user.name,
        crpNumber: user.crpNumber,
      },
      process.env.JWT_SECRET as string,
      { subject: user.id.toString() }
    );

    return { id: user.id, name: user.name, email: user.email, token };
  }

  async decryptToken(token: string) {
    const data: any = decode(token);
    return { id: data.sub, name: data.name };
  }
}
