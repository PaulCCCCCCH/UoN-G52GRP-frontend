export class Questionnaire {
  id: number;
  title: string;
  dateAssigned: Date;
  deadline: Date;
  description: string;
  otherInfo: string; // Need more (date, creator, pointers, etc.)


  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.dateAssigned = new Date();
    this.deadline = new Date();
    this.description = 'Something about the questionnaire';
  }
}
