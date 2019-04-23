import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionnaireSubmitConfirmComponent} from './questionnaire-submit-confirm.component';

describe('QuestionnaireSubmitConfirmComponent', () => {
  let component: QuestionnaireSubmitConfirmComponent;
  let fixture: ComponentFixture<QuestionnaireSubmitConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireSubmitConfirmComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireSubmitConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
