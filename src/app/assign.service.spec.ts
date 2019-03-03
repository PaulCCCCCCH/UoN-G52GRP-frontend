import { TestBed } from '@angular/core/testing';

import { AssignService } from './assign.service';

describe('AssignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignService = TestBed.get(AssignService);
    expect(service).toBeTruthy();
  });
});
