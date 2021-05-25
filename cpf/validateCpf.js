const FACTOR_DIGIT_1 = 10;
const FACTOR_DIGIT_2 = 11;
const BASE_1 = 9;
const BASE_2 = 10;

function validateCpf(cpf = "") {
  cpf = extractDigits(cpf);
  if (isInvalidLength(cpf)) return false;
  if (isInvalidCpf(cpf)) return false;
  const firstDigit = calculateDigit(cpf, FACTOR_DIGIT_1, BASE_1);
  const secondDigit = calculateDigit(cpf, FACTOR_DIGIT_2, BASE_2);
  const calculatedDigit = `${firstDigit}${secondDigit}`;
  return verifyDigit(cpf) === calculatedDigit;
}

function extractDigits(cpf) {
  return cpf.replace(/\D/g, "");
}

function isInvalidLength(cpf) {
  return cpf.length !== 11;
}

function isInvalidCpf(cpf) {
  const [firstDigit] = cpf[0];
  return cpf.split("").every((d) => d === firstDigit);
}

function calculateDigit(cpf, factor, base) {
  let total = 0;
  for (const digit of toDigitArray(cpf).slice(0, base)) {
    total += digit * factor--;
  }
  return total % 11 < 2 ? 0 : 11 - (total % 11);
}

function toDigitArray(cpf) {
  return [...cpf].map((digit) => parseInt(digit));
}

function verifyDigit(cpf) {
  return cpf.slice(9);
}

console.log(validateCpf("00000000000"));
console.log(validateCpf("86446422784"));
console.log(validateCpf("864.464.227-84"));
console.log(validateCpf("91720489726"));
