import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewResponseSetComponent} from './view-response-set.component';

describe('ViewResponseSetComponent', () => {
  let component: ViewResponseSetComponent;
  let fixture: ComponentFixture<ViewResponseSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewResponseSetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResponseSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
