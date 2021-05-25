import EnrollStudent from "./EnrollStudent";

test("Should not enroll without valid student name", () => {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: "Ana",
    },
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
  };
  enrollStudent.execute(enrollmentRequest);
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(
    new Error("Enrollment with duplicated student is not allowed")
  );
});
