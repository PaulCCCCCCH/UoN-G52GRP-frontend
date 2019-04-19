import {UUID} from 'angular2-uuid';

export class Question {
  id: string;
  type: string;		//text | text box | choice | multiple choices
  typeCode: number; 	//1     |      2      |       3    |            4
  preReqs: number[];    			// List of prerequisite question IDs
  questionBody: string;
  choices: string[];  			/* Each one corresponds to a choice.
                              * e.g. [“I like it”, “I don’t like it”, “I hate it”]
                              * empty for text questions.
                              */
	responseListUrl: string; 		/* url to get the list of response to a specific
                                * question
                                */
  stats: number[]; 			/* a list of numbers showing the number of people
                          * choosing each answer. E.g. [ 300, 120, 100, 20]
                          * Return an empty list if it’s a text question.
                          */

  constructor(typeCode: number) {
    this.typeCode = typeCode;
    switch (typeCode) {
      case 0:
        this.type = 'Text';
        break;
      case 1:
        this.type = 'Text Box';
        break;
      case 2:
        this.type = 'Choice';
        break;
      case 3:
        this.type = 'Multiple Choices';
        break;
    }
    this.choices = [];
    this.questionBody = '';
    this.id = UUID.UUID();
  }

  setBody(body: string) {
    this.questionBody = body;
  }

  addPrereq(index: number) {
    // TODO: Add question dependencies.
  }
}
