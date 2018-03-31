import { TestBed, inject } from '@angular/core/testing';

import { UserResultsService } from './user-results.service';

describe('UserResultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserResultsService]
    });
  });

  it('should be created', inject([UserResultsService], (service: UserResultsService) => {
    expect(service).toBeTruthy();
  }));
});
