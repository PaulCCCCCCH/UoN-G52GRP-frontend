import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionnaireDashboardComponent} from './questionnaire-dashboard.component';

describe('QuestionnaireDashboardComponent', () => {
  let component: QuestionnaireDashboardComponent;
  let fixture: ComponentFixture<QuestionnaireDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireDashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
