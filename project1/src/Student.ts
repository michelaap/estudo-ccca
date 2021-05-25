import Cpf from "./Cpf";
import Name from "./Name";

export default class Student {
  name: string;
  cpf: string;

  constructor(name: string, cpf: string) {
    this.name = new Name(name).value;
    this.cpf = new Cpf(cpf).value;
  }
}
