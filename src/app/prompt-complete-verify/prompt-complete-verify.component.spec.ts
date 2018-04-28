import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptCompleteVerifyComponent } from './prompt-complete-verify.component';

describe('PromptCompleteVerifyComponent', () => {
  let component: PromptCompleteVerifyComponent;
  let fixture: ComponentFixture<PromptCompleteVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromptCompleteVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptCompleteVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
