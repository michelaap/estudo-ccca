import ClassRepository from "./ClassRepository";
import Enrollment from "./Enrollment";
import EnrollmentRepository from "./EnrollmentRepository";
import LevelRepository from "./LevelRepository";
import ModuleRepository from "./ModuleRepository";
import Student from "./Student";

export default class EnrollStudent {
  enrollmentRepository: EnrollmentRepository;
  levelRepository: LevelRepository;
  moduleRepository: ModuleRepository;
  classRepository: ClassRepository;

  constructor(
    levelRepository: LevelRepository,
    moduleRepository: ModuleRepository,
    classRepository: ClassRepository,
    enrollmentRepository: EnrollmentRepository
  ) {
    this.levelRepository = levelRepository;
    this.moduleRepository = moduleRepository;
    this.classRepository = classRepository;
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
    const clazz = this.classRepository.findByCode(enrollmentRequest.class);
    if (student.getAge() < module.minimumAge) {
      throw new Error("Student below minimum age");
    }
    const studentsEnrolledInClass = this.enrollmentRepository.findAllByClass(
      level.code,
      module.code,
      clazz.code
    );
    if (studentsEnrolledInClass.length === clazz.capacity) {
      throw new Error("Class is over capacity");
    }
    const existingEnrollment = this.enrollmentRepository.findByCpf(student.cpf);
    if (existingEnrollment) {
      throw new Error("Enrollment with duplicated student is not allowed");
    }
    const sequence = new String(this.enrollmentRepository.count() + 1).padStart(
      4,
      "0"
    );
    const year = new Date().getFullYear();
    const code = `${year}${level.code}${module.code}${clazz.code}${sequence}`;
    const enrollment = new Enrollment(
      student,
      level.code,
      module.code,
      clazz.code,
      code
    );
    this.enrollmentRepository.save(enrollment);
    return enrollment;
  }
}
