import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';

@Injectable()
export class FileUploadService {

  constructor(private http: HttpClient) { }


  private _proxyHost: string = Constants.API_URL;

  UploadFile(file: File) {

    let formData: FormData = new FormData;
    formData.append('Document', file);
    return this.http.post(`${this._proxyHost}/uploaddocument/upload`, formData);

  }
}
