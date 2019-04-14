import {Question} from './question';

export class QuestionSet {
  questionnaireId: string;
  questions: Question[];
  responseSetListUrl: string;		// Url to get the ResponseSet Object array.
}
