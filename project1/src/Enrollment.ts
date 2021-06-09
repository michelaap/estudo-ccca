import Classroom from "./Classroom";
import EnrollmentCode from "./EnrollmentCode";
import Invoice from "./Invoice";
import Level from "./Level";
import Module from "./Module";
import Student from "./Student";

export default class Enrollment {
  student: Student;
  level: Level;
  module: Module;
  classroom: Classroom;
  code: EnrollmentCode;
  sequence: number;
  issueDate: Date;
  workloadLimit = 0.25;
  installments: number;
  invoices: Invoice[];

  constructor(
    student: Student,
    level: Level,
    module: Module,
    classroom: Classroom,
    issueDate: Date,
    sequence: number,
    installments: number = 12
  ) {
    if (student.getAge() < module.minimumAge) {
      throw new Error("Student below minimum age");
    }
    if (classroom.isFinished(issueDate)) {
      throw new Error("Class is already finished");
    }
    if (
      classroom.getProgress(issueDate) >
      classroom.getWorkload() * this.workloadLimit
    ) {
      throw new Error("Class is already started");
    }
    this.student = student;
    this.level = level;
    this.module = module;
    this.classroom = classroom;
    this.sequence = sequence;
    this.issueDate = issueDate;
    this.code = new EnrollmentCode(
      level.code,
      module.code,
      classroom.code,
      issueDate,
      sequence
    );
    this.invoices = [];
    this.installments = installments;
    this.generateInvoices();
  }

  generateInvoices() {
    const installmentValue = Math.floor(this.module.price / this.installments);
    const restAmount = this.module.price % this.installments;
    const lastInstallmentValue = installmentValue + restAmount;
    for (let i = 0; i < this.installments; i++) {
      const date = this.issueDate;
      const invoiceDate = date.setMonth(date.getMonth() + i);
      let amount = installmentValue;
      if (i + 1 === this.installments) amount = lastInstallmentValue;
      const invoice = new Invoice(
        this.code.value,
        new Date(invoiceDate),
        amount
      );
      this.invoices.push(invoice);
    }
    return this.invoices;
  }
}
