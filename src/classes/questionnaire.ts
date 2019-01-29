export class Questionnaire {
  id: number;
  title: string;
  otherInfo: string; // Need more (date, creator, pointers, etc.)

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}
