import { TestBed, inject } from '@angular/core/testing';

import { QuestionpaperService } from './questionpaper.service';

describe('QuestionpaperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionpaperService]
    });
  });

  it('should be created', inject([QuestionpaperService], (service: QuestionpaperService) => {
    expect(service).toBeTruthy();
  }));
});
