import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionnaireSubmitComponent} from './questionnaire-submit.component';

describe('QuestionnaireSubmitComponent', () => {
  let component: QuestionnaireSubmitComponent;
  let fixture: ComponentFixture<QuestionnaireSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireSubmitComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
