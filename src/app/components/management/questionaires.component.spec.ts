import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionairesComponent } from './questionaires.component';

describe('QuestionairesComponent', () => {
  let component: QuestionairesComponent;
  let fixture: ComponentFixture<QuestionairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
