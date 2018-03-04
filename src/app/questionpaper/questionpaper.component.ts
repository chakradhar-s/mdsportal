import { Component, OnInit } from '@angular/core';
import {FileUploadModule} from 'primeng/fileupload';
import { FileUploadService } from '../mdsportal.services/file.upload.service';

@Component({
  selector: 'app-questionpaper',
  templateUrl: './questionpaper.component.html',
  styleUrls: ['./questionpaper.component.scss']
})
export class QuestionpaperComponent implements OnInit {

  //msgs: Message[];
  
  uploadedFile: File;
  constructor(private fileService:FileUploadService) { }

  ngOnInit() {
  }

 

  onUpload(event) {


    let files = event.target.files;
      
     if(files.length > 0)
     this.uploadedFile = files[0];    
     this.fileService.UploadFile(this.uploadedFile);
  
      // this.msgs = [];
      // this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
}
