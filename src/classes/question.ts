export class Question {
  id: number;
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
}
