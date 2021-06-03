import ClassRepositoryMemory from "./ClassRepositoryMemory";
import EnrollmentRepositoryMemory from "./EnrollmentRepositoryMemory";
import EnrollStudent from "./EnrollStudent";
import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";

let enrollStudent: EnrollStudent;

beforeEach(function () {
  const enrollmentRepository = new EnrollmentRepositoryMemory();
  const levelRepository = new LevelRepositoryMemory();
  const moduleRepository = new ModuleRepositoryMemory();
  const classRepository = new ClassRepositoryMemory();
  enrollStudent = new EnrollStudent(
    levelRepository,
    moduleRepository,
    classRepository,
    enrollmentRepository
  );
});

test("Should not enroll without valid student name", () => {
  const enrollmentRequest = {
    student: {
      name: "Ana",
    },
    level: "EM",
    module: "1",
    class: "A",
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Invalid name")
  );
});

test("Should not enroll without valid student cpf", () => {
  const enrollmentRequest = {
    student: {
      name: "Ana Silva",
      cpf: "123.456.789-99",
    },
    level: "EM",
    module: "1",
    class: "A",
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Invalid cpf")
  );
});

test("Should not enroll duplicated student", () => {
  const enrollmentRequest = {
    student: {
      name: "Ana Silva",
      cpf: "832.081.519-34",
    },
    level: "EM",
    module: "1",
    class: "A",
  };
  enrollStudent.execute(enrollmentRequest);
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Enrollment with duplicated student is not allowed")
  );
});

test("Should generate enrollment code", function () {
  const enrollmentRequest = {
    student: {
      name: "Ana Silva",
      cpf: "832.081.519-34",
    },
    level: "EM",
    module: "1",
    class: "A",
  };
  const enrollment = enrollStudent.execute(enrollmentRequest);
  expect(enrollment.code).toBe("2021EM1A0001");
});

test("Should not enroll student below minimum age", function () {
  const enrollmentRequest = {
    student: {
      name: "Ana Silva",
      cpf: "832.081.519-34",
      birthDate: "2014-03-12",
    },
    level: "EM",
    module: "1",
    class: "A",
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Student below minimum age")
  );
});

test("Should not enroll student over class capacity", function () {
  enrollStudent.execute({
    student: {
      name: "Ana Silva",
      cpf: "219.812.403-30",
    },
    level: "EM",
    module: "1",
    class: "A",
  });
  enrollStudent.execute({
    student: {
      name: "Ana Silva",
      cpf: "256.528.034-36",
    },
    level: "EM",
    module: "1",
    class: "A",
  });
  const enrollmentRequest = {
    student: {
      name: "Ana Silva",
      cpf: "832.081.519-34",
    },
    level: "EM",
    module: "1",
    class: "A",
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    "Class is over capacity"
  );
});
