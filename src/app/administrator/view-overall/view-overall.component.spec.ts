import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewOverallComponent} from './view-overall.component';

describe('ViewOverallComponent', () => {
  let component: ViewOverallComponent;
  let fixture: ComponentFixture<ViewOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOverallComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
