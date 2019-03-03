import { TestBed } from '@angular/core/testing';

import { ManageStaffService } from './manage-staff.service';

describe('ManageStaffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageStaffService = TestBed.get(ManageStaffService);
    expect(service).toBeTruthy();
  });
});
