import Student from "./Student";

export default class EnrollStudent {
  enrollments: any = [];

  execute(enrollmentRequest: any) {
    const {
      student: { name, cpf },
    } = enrollmentRequest;
    const student = new Student(name, cpf);
    const enrollment = { student };
    if (
      this.enrollments.find(
        (enrollment: any) => enrollment?.student.cpf === student.cpf
      )
    ) {
      throw new Error("Enrollment with duplicated student is not allowed");
    }
    this.enrollments.push(enrollment);
  }
}
