import Enrollment from "./Enrollment";
import EnrollmentRepository from "./EnrollmentRepository";

export default class EnrollmentRepositoryMemory
  implements EnrollmentRepository
{
  enrollments: Enrollment[];

  constructor() {
    this.enrollments = [];
  }

  save(enrollment: Enrollment): void {
    this.enrollments.push(enrollment);
  }

  findAllByClass(level: string, module: string, clazz: string) {
    return this.enrollments.filter(
      (enrollment) =>
        enrollment.clazz === clazz &&
        enrollment.level === level &&
        enrollment.module === module
    );
  }

  findByCpf(cpf: string) {
    return this.enrollments.find(
      (enrollment) => enrollment.student.cpf === cpf
    );
  }

  count(): number {
    return this.enrollments.length;
  }
}
