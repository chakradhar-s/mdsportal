import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAnalysisComponentComponent } from './subject-analysis-component.component';

describe('SubjectAnalysisComponentComponent', () => {
  let component: SubjectAnalysisComponentComponent;
  let fixture: ComponentFixture<SubjectAnalysisComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectAnalysisComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectAnalysisComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
