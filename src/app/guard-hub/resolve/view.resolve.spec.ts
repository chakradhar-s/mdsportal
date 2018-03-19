import { TestBed, inject } from '@angular/core/testing';

import { ViewResolve } from './view.resolve';

describe('View.ResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewResolve]
    });
  });

  it('should be created', inject([ViewResolve], (service: ViewResolve) => {
    expect(service).toBeTruthy();
  }));
});
