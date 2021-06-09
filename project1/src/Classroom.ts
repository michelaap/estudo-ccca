export default class Classroom {
  level: string;
  module: string;
  code: string;
  capacity: number;
  startDate: Date;
  endDate: Date;

  constructor({
    level,
    module,
    code,
    capacity,
    startDate,
    endDate,
  }: {
    level: string;
    module: string;
    code: string;
    capacity: number;
    startDate: Date;
    endDate: Date;
  }) {
    this.level = level;
    this.module = module;
    this.code = code;
    this.capacity = capacity;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  isFinished(currentDate: Date) {
    return currentDate.getTime() > this.endDate.getTime();
  }

  getProgress(currentDate: Date) {
    const dayInMilleseconds = 1000 * 60 * 60 * 24;
    const startClassroom = this.startDate.getTime();
    return (currentDate.getTime() - startClassroom) / dayInMilleseconds;
  }

  getWorkload() {
    const dayInMilleseconds = 1000 * 60 * 60 * 24;
    const startClassroom = this.startDate.getTime();
    const endClassroom = this.endDate.getTime();
    return (endClassroom - startClassroom) / dayInMilleseconds;
  }
}
