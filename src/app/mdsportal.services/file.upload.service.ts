import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FileUploadService {

  constructor(private http: HttpClient) { }

  private _localHost: string = "http://localhost:5000/mdservice/api";

  UploadFile(file: File) {

    let formData: FormData = new FormData;
    formData.append('Document', file);
    this.http.post(`${this._localHost}/uploaddocument/upload`, formData)
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
