import { TestBed, inject } from '@angular/core/testing';

import { QuestionsImageService } from './questions-image.service';

describe('QuestionsImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionsImageService]
    });
  });

  it('should be created', inject([QuestionsImageService], (service: QuestionsImageService) => {
    expect(service).toBeTruthy();
  }));
});
