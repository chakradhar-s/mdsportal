import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleDrawComponent } from './circle-draw.component';

describe('CircleDrawComponent', () => {
  let component: CircleDrawComponent;
  let fixture: ComponentFixture<CircleDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
