export default class Cpf {
  value: string;

  constructor(value: string) {
    if (!this.validateCpf(value)) throw new Error("Invalid cpf");
    this.value = this.extractDigits(value);
  }

  validateCpf(cpf = "") {
    const FACTOR_DIGIT_1 = 10;
    const FACTOR_DIGIT_2 = 11;
    const BASE_1 = 9;
    const BASE_2 = 10;
    cpf = this.extractDigits(cpf);
    if (this.isInvalidLength(cpf)) return false;
    if (this.isInvalidCpf(cpf)) return false;
    const firstDigit = this.calculateDigit(cpf, FACTOR_DIGIT_1, BASE_1);
    const secondDigit = this.calculateDigit(cpf, FACTOR_DIGIT_2, BASE_2);
    const calculatedDigit = `${firstDigit}${secondDigit}`;
    return this.verifyDigit(cpf) === calculatedDigit;
  }

  extractDigits(cpf: string) {
    return cpf.replace(/\D/g, "");
  }

  isInvalidLength(cpf: string) {
    return cpf.length !== 11;
  }

  isInvalidCpf(cpf: string) {
    const [firstDigit] = cpf[0];
    return cpf.split("").every((d) => d === firstDigit);
  }

  calculateDigit(cpf: string, factor: number, base: number) {
    let total = 0;
    for (const digit of this.toDigitArray(cpf).slice(0, base)) {
      total += digit * factor--;
    }
    return total % 11 < 2 ? 0 : 11 - (total % 11);
  }

  toDigitArray(cpf: string) {
    return [...cpf].map((digit) => parseInt(digit));
  }

  verifyDigit(cpf: string) {
    return cpf.slice(9);
  }
}
