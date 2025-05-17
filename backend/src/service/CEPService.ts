import cep from "cep-promise";

export default class CEPService {
  async consultar(cepNumber: string) {
    try {
      return cep(cepNumber);
    } catch (error) {
      console.error("Erro ao consultar o CEP:", error);
      return null;
    }
  }
}
