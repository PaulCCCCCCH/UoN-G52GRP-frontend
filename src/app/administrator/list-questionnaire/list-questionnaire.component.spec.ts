import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListQuestionnaireComponent} from './list-questionnaire.component';

describe('QListComponent', () => {
  let component: ListQuestionnaireComponent;
  let fixture: ComponentFixture<ListQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListQuestionnaireComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
