export class Response {
  questionId: number;
  responseId: number;
  type: string;		// text | text box | choice | multiple choices
  typeCode: number; 	// 1     |      2      |       3    |            4
  responseBody: string; 			/* For (multiple) choices questions, give a string of
						* numbers separated by comma, e.g. ‘1, 3, 4’ ,  ‘1’
						* For text questions, just return the string.
						*/

}
