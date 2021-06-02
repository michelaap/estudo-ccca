import EnrollStudent from "./EnrollStudent";

test("Should not enroll without valid student name", () => {
  const enrollStudent = new EnrollStudent();
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
  const enrollStudent = new EnrollStudent();
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
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: "Ana Silva",
      cpf: "832.081.519-34", // gerado em geradorcpf.com
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
  const enrollStudent = new EnrollStudent();
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
  const enrollStudent = new EnrollStudent();
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
  const enrollStudent = new EnrollStudent();
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
