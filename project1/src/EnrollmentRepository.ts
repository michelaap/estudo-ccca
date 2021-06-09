import Enrollment from "./Enrollment";

export default interface EnrollmentRepository {
  save(enrollment: any): void;
  findAllByClassroom(
    level: string,
    module: string,
    classroom: string
  ): Enrollment[];
  findByCpf(cpf: string): Enrollment | undefined;
  count(): number;
}
