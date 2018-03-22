import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FileUploadService {

  constructor(private http: HttpClient) { }

  UploadFile(file: File) {

    let formData: FormData = new FormData;
    formData.append('Document', file);
    this.http.post('http://localhost:62699/mdservice/api/uploaddocument/upload', formData)
    .subscribe(
      res=>{
          console.log(res);
      },
      err=>{
        console.log(err);
      }
    )

  }
}
