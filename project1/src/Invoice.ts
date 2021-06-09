export default class Invoice {
  code: string;
  date: Date;
  amount: number;

  constructor(code: string, date: Date, amount: number) {
    this.code = code;
    this.date = date;
    this.amount = amount;
  }
}
