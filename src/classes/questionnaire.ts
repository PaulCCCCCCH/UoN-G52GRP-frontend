import {QuestionSet} from './questionSet';
import {ResponseSet} from './responseSet';

export class Questionnaire {

    clientName: string; 		// Client company name
    clientId: number; 		// The ID of the client that the questionnaire belongs to
    id: number;
    title: string;
    dateAssigned: string;
    deadline: string;		// Should be Javascript built in Date Object
    description: string;
    responseNumber: number;
    assignedNumber: number;
    status: string;			// Active | Expired | Waiting
    statusCode: number;		// 1 | 0 | 2
    questionSetUrl: QuestionSet;		// url to get the QuestionSet object
    responseSetListUrl: ResponseSet[ ];	// url to get ResponseSet object array
    respondentListUrl: string; // url to get Respondent object array



  constructor(id: number, title: string) {
    /*
    this.id = id;
    this.title = title;
    this.dateAssigned = '8 Feb 2019';
    this.deadline = '8 Mar 2019';
    this.description = 'Something about the questionnaire';
    this.responseNumber = 15;
    this.assignedNumber = 45;
    this.status = 'Accepting responses';
    */
  }
}
