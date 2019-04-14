import {Response} from './response';

export class ResponseSet {
  userId: string;
  questionnaireId: string;
  questionSetUrl: string; 	// url to get the QuestionSet object
  responses: Response[]; /* a map of { questionId: Response object }
						* e.g. { 2357091: response1, 13515: response2 }
						*/
  submitDate: string;
  excerpt: string;		// Text up to 50 words

}
