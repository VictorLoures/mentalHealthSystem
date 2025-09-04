import { Repository } from "typeorm";
import { AdressDTO } from "../dto/AdressDTO";
import { Address } from "../model/Adress";
import { AppDataSource } from "../../ormconfig";

export default class AddressService {
  private readonly repo: Repository<Address>;

  constructor() {
    this.repo = AppDataSource.getRepository(Address);
  }

  async createOrUpdate(adressDTO: AdressDTO) {
    const adress = this.repo.create(adressDTO);
    const result = await this.repo.save(adress);
    return result.id;
  }
}
