import { Component, OnInit } from '@angular/core';

import { Alert } from '../../models/alert.interface';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  host_url: string = "http://localhost:5000/mdservice/api/UploadDocument/uploadimages";
  form_method: string = "";
  uploadedFiles: any[] = [];
  public alerts: Array<Alert> = [];

  newPaths: string[]=[];

  constructor() {

  }

  ngOnInit() {
    this
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.alerts = [];
    this.alerts.push({
      id: 1,
      type: 'success',
      message: 'Upload is successed'
    });

    //event.xhr
    const paths: string[] = JSON.parse(event.xhr.response).pathS;
    this.newPaths = paths;

  }

}
