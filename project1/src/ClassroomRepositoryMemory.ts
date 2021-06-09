import Classroom from "./Classroom";
import ClassroomRepository from "./ClassroomRepository";

export default class ClassroomRepositoryMemory implements ClassroomRepository {
  classes: Classroom[];

  constructor() {
    this.classes = [
      new Classroom({
        level: "EM",
        module: "3",
        code: "A",
        capacity: 2,
        startDate: new Date("2021-06-01"),
        endDate: new Date("2021-12-15"),
      }),
      new Classroom({
        level: "EM",
        module: "3",
        code: "B",
        capacity: 5,
        startDate: new Date("2021-05-01"),
        endDate: new Date("2021-05-30"),
      }),
      new Classroom({
        level: "EM",
        module: "3",
        code: "C",
        capacity: 5,
        startDate: new Date("2021-05-01"),
        endDate: new Date("2021-06-30"),
      }),
    ];
  }

  findByCode(code: string) {
    const classroom = this.classes.find((classroom) => classroom.code === code);
    if (!classroom) throw new Error("Class not found");
    return classroom;
  }
}
