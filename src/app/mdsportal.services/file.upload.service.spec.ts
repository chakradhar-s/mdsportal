import { TestBed, inject } from '@angular/core/testing';

import { File.UploadService } from './file.upload.service';

describe('File.UploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [File.UploadService]
    });
  });

  it('should be created', inject([File.UploadService], (service: File.UploadService) => {
    expect(service).toBeTruthy();
  }));
});
