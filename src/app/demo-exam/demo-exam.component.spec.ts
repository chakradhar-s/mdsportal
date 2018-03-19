import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoExamComponent } from './demo-exam.component';

describe('DemoExamComponent', () => {
  let component: DemoExamComponent;
  let fixture: ComponentFixture<DemoExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
