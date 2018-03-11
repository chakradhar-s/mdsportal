import { Component, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { FileUploadService } from '../mdsportal.services/file.upload.service';
import { QuestionpaperService} from '../mdsportal.services/questionpaper.service';
import { QuestionPaper } from '../modals/questionpaper';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-questionpaper',
  templateUrl: './questionpaper.component.html',
  styleUrls: ['./questionpaper.component.scss']
})
export class QuestionpaperComponent implements OnInit {

  //msgs: Message[];

  uploadedFile: File;
  columns: any;
  questionPaperGroup : QuestionPaper[];
  selectedQuestionGroup : QuestionPaper[];

  constructor(private fileService: FileUploadService,private questionService:QuestionpaperService) { }

  ngOnInit() {
    this.columns = [{ field: "question_paper_id", header: "Question Paper ID" },
    { field: "is_active", header: "Is Active" },
    { field: "file_name", header: "File Name" }];

   this.questionService.GetAllQuestionSet()
  .subscribe(res=>{ this.questionPaperGroup = res;},err=>{console.log(err);});

  }



  onUpload(event) {


    let files = event.target.files;

    if (files.length > 0)
      this.uploadedFile = files[0];
    this.fileService.UploadFile(this.uploadedFile);
  }


  CheckBoxAllSelectHndlr(event,checked){
    console.log(checked);
    console.log(this.selectedQuestionGroup);

    

  }

}
