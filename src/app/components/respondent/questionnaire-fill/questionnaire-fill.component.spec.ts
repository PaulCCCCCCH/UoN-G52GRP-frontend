import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireFillComponent } from './questionnaire-fill.component';

describe('QuestionnaireFillComponent', () => {
  let component: QuestionnaireFillComponent;
  let fixture: ComponentFixture<QuestionnaireFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
