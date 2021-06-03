import Cpf from "./Cpf";
import Name from "./Name";

export default class Student {
  name: string;
  cpf: string;
  birthDate: Date;

  constructor(name: string, cpf: string, birthDate: string) {
    this.name = new Name(name).value;
    this.cpf = new Cpf(cpf).value;
    this.birthDate = new Date(birthDate);
  }

  getAge() {
    return new Date().getFullYear() - this.birthDate.getFullYear();
  }
}
