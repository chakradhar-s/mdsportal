import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Alert } from '../../models/alert.interface';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFileComponent implements OnInit {

  @Input()
  upload_url: string;
  @Input()
  isMultiple: boolean;
  @Output()
  effPaths = new EventEmitter<Array<string>>();


  host_url: string = "http://localhost:5000/mdservice/api/UploadDocument/uploadimages";
  //host_url: string = "https://ec2-52-66-160-163.ap-south-1.compute.amazonaws.com/mdservice/api";
  form_method: string = "";
  uploadedFiles: any[] = [];
  public alerts: Array<Alert> = [];

  newPaths: string[] = [];

  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    if (this.upload_url && this.upload_url.length) {
      this.host_url = this.upload_url;
    }
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
    if (!(this.upload_url && this.upload_url.length)) {
      this.newPaths = paths;
      //todo emit output
    }

  }

  public closeAlert(alert: Alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public onBeforeUpload(event) {
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));    
      event.xhr.setRequestHeader('Authorization', 'bearer ' + rslt.access_token);
    }
  }

}
