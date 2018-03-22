import { Component, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { FileUploadService } from '../mdsportal.services/file.upload.service';
import { QuestionpaperService} from '../mdsportal.services/questionpaper.service';
import { QuestionPaper } from '../modals/questionpaper';
import { TableModule } from 'primeng/table';
import { forEach } from '@angular/router/src/utils/collection';

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
  allChecked : boolean;

  constructor(private fileService: FileUploadService,private questionService:QuestionpaperService) {

    this.allChecked = false;
   }

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


  CheckBoxAllSelectHndlr(event){
   this.allChecked = event.target.checked;
    this.questionPaperGroup.map(function(s){ s.is_active = event.target.checked });
    this.questionService.EnableOrDisableQuestionPapers(this.questionPaperGroup)
      .subscribe(res=>{
       console.log(res);
      },err=>{
       console.log(err);
      });
  }

  IsActiveCheckHndlr(event,rowData){
    rowData.is_active = event.target.checked;
    this.AllTrueOrAllFalse();
    this.questionService.EnableOrDisableQuestionPapers([rowData])
    .subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    });
  }

  AllTrueOrAllFalse(){
    var trueCount = this.questionPaperGroup.filter(function(s){ if(s.is_active) return s.is_active; });
    var falseCount = this.questionPaperGroup.filter(function(s){ if(!s.is_active) return s.is_active; });

    if(trueCount.length == this.questionPaperGroup.length)
       this.allChecked = true;
       else this.allChecked = false;
  }

}
