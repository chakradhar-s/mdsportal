import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FileUploadService {

  constructor(private http: HttpClient) { }

  UploadFile(file: File) {

    let formData: FormData = new FormData;
    formData.append('fileKey', file, file.name);
    this.http.post('http://localhost:62700/api/upload-document', formData);

  }
}
