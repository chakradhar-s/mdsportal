import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FileUploadService {

  constructor(private http: HttpClient) { }

  private _proxyHost: string = "http://ec2-52-66-160-163.ap-south-1.compute.amazonaws.com/mdservice/api";
  //private _proxyHost: string = "http://localhost:5000/mdservice/api";

  UploadFile(file: File) {

    let formData: FormData = new FormData;
    formData.append('Document', file);
    this.http.post(`${this._proxyHost}/uploaddocument/upload`, formData)
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
