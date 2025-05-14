import { LoginDTO } from "../dto/LoginDTO";
import client from "../prismaConfig";
import { compare } from "bcryptjs";
import { decode, sign } from "jsonwebtoken";

export default class LoginService {
  async login({ login, password }: LoginDTO) {
    const user = await client.doctor.findFirst({
      where: {
        OR: [{ email: login }, { cpf: login }, { crpNumber: login }],
      },
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

    return { name: user.name, email: user.email, token };
  }

  async decryptToken(token: string) {
    const data: any = decode(token);
    return { id: data.sub, name: data.name };
  }
}
