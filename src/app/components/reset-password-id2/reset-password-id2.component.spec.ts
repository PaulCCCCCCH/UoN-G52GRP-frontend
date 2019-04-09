import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordId2Component } from './reset-password-id2.component';

describe('ResetPasswordId2Component', () => {
  let component: ResetPasswordId2Component;
  let fixture: ComponentFixture<ResetPasswordId2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordId2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordId2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
