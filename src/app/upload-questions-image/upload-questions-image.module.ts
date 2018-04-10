import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadQuestionsImageRoutingModule } from './upload-questions-image-routing.module';
import { UploadFileComponent } from './upload-file/upload-file.component';

import { FileUploadModule } from 'primeng/fileupload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    UploadQuestionsImageRoutingModule,
    FileUploadModule,
    NgbModule
  ],
  declarations: [UploadFileComponent],
  exports: [UploadFileComponent]
})
export class UploadQuestionsImageModule { }
