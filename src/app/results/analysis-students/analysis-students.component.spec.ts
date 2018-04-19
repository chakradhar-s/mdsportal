import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisStudentComponent } from './analysis-students.component';

describe('AnalysisStudentsComponent', () => {
  let component: AnalysisStudentComponent;
  let fixture: ComponentFixture<AnalysisStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
