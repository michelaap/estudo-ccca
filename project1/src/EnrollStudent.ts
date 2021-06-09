import ClassroomRepository from "./ClassroomRepository";
import Enrollment from "./Enrollment";
import EnrollmentRepository from "./EnrollmentRepository";
import LevelRepository from "./LevelRepository";
import ModuleRepository from "./ModuleRepository";
import Student from "./Student";

export default class EnrollStudent {
  enrollmentRepository: EnrollmentRepository;
  levelRepository: LevelRepository;
  moduleRepository: ModuleRepository;
  classroomRepository: ClassroomRepository;

  constructor(
    levelRepository: LevelRepository,
    moduleRepository: ModuleRepository,
    classroomRepository: ClassroomRepository,
    enrollmentRepository: EnrollmentRepository
  ) {
    this.levelRepository = levelRepository;
    this.moduleRepository = moduleRepository;
    this.classroomRepository = classroomRepository;
    this.enrollmentRepository = enrollmentRepository;
  }

  execute(enrollmentRequest: any) {
    const { name, cpf, birthDate } = enrollmentRequest.student;
    const student = new Student(name, cpf, birthDate);
    const level = this.levelRepository.findByCode(enrollmentRequest.level);
    const module = this.moduleRepository.findByCode(
      enrollmentRequest.level,
      enrollmentRequest.module
    );
    const classroom = this.classroomRepository.findByCode(
      enrollmentRequest.classroom
    );
    const studentsEnrolledInClass =
      this.enrollmentRepository.findAllByClassroom(
        level.code,
        module.code,
        classroom.code
      );
    if (studentsEnrolledInClass.length === classroom.capacity)
      throw new Error("Class is over capacity");
    const existingEnrollment = this.enrollmentRepository.findByCpf(student.cpf);
    if (existingEnrollment)
      throw new Error("Enrollment with duplicated student is not allowed");
    const enrollmentSequence = this.enrollmentRepository.count() + 1;
    const issueDate = new Date();
    const { installments } = enrollmentRequest;
    const enrollment = new Enrollment(
      student,
      level,
      module,
      classroom,
      issueDate,
      enrollmentSequence,
      installments
    );
    this.enrollmentRepository.save(enrollment);
    return enrollment;
  }
}
