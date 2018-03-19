import { TestBed, async, inject } from '@angular/core/testing';

import { ViewUserGuard } from './view-user.guard';

describe('ViewUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewUserGuard]
    });
  });

  it('should ...', inject([ViewUserGuard], (guard: ViewUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
