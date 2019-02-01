import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionnairesComponent } from './view-questionnaires.component';

describe('ViewQuestionnairesComponent', () => {
  let component: ViewQuestionnairesComponent;
  let fixture: ComponentFixture<ViewQuestionnairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewQuestionnairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
