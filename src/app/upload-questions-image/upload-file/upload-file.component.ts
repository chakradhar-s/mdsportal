import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { QuestionsImageService } from '../../http-service-registry/services/questions-image.service';

import { Alert } from '../../models/alert.interface';
import { Constants } from '../../constants';

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

  public  host_url: string = Constants.API_URL + "/UploadDocument/uploadimages";
  
  public form_method: string = "";
  public uploadedFiles: any[] = [];
  public alerts: Array<Alert> = [];
  public pastImages: string[] = [];
  public newPaths: string[] = [];

  constructor(private cd: ChangeDetectorRef, private questionsImage: QuestionsImageService) {

  }

  ngOnInit() {
    if (this.upload_url && this.upload_url.length) {
      this.host_url = this.upload_url;
    }
    else {
      this.questionsImage.getQuestionsImage().subscribe((t) => {
        this.pastImages = [];
        this.pastImages = t;
        this.cd.detectChanges();
      });
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
    }
    else {
      this.effPaths.emit(paths);
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
