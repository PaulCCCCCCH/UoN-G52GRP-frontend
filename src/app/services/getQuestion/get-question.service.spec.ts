import { TestBed } from '@angular/core/testing';

import { GetQuestionService } from './get-question.service';

describe('GetQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetQuestionService = TestBed.get(GetQuestionService);
    expect(service).toBeTruthy();
  });
});
