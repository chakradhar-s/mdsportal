import { Component, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { FileUploadService } from '../mdsportal.services/file.upload.service';
import { QuestionpaperService } from '../mdsportal.services/questionpaper.service';
import { QuestionPaper } from '../modals/questionpaper';
import { TableModule } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/primeng';
import { forEach } from '@angular/router/src/utils/collection';
import { DataTableTrackEvent } from '../user-profile/user-management/user-management.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-questionpaper',
  templateUrl: './questionpaper.component.html',
  styleUrls: ['./questionpaper.component.scss']
})
export class QuestionpaperComponent implements OnInit {

  public uploadedFile: File;
  public columns: any;
  public questionPaperGroup: QuestionPaper[];
  public selectedQuestionGroup: QuestionPaper[];
  public allChecked: boolean;
  public totalRecords: number;
  public pagesToDisplay: number;
  public loading: boolean = true;

  public dataTableEvent: DataTableTrackEvent = { currentFilter: '', currentFirstRec: 1, currentRows: 10 };

  constructor(private fileService: FileUploadService,
    private questionService: QuestionpaperService,
    private confirmationService: ConfirmationService) {

    this.allChecked = false;
  }

  ngOnInit() {
    this.totalRecords = 10;
    this.pagesToDisplay = 3;
    this.columns = [
      { field: "questionPaperId", header: "Question Paper ID" },
      { field: "isActive", header: "Is Active" },
      { field: "fileName", header: "File Name" }
    ];

  }

  loadPapersLazy(event: LazyLoadEvent) {
    console.log(this.selectedQuestionGroup);
    this.loading = true;
    this.dataTableEvent = { currentFirstRec: event.first + 1, currentRows: event.rows, currentFilter: event.globalFilter };
    this.serverCall();
  }
  serverCall() {
    this.questionService.getAllPapersPaged(this.dataTableEvent.currentFirstRec, this.dataTableEvent.currentRows, this.dataTableEvent.currentFilter)
      .subscribe((res: PapersPaginated) => {
        this.questionPaperGroup = res.papers;
        this.totalRecords = res.count;
        console.log('Total records available : ', res.count);
        if (res.count % this.dataTableEvent.currentRows == 0)
          this.pagesToDisplay = res.count / this.dataTableEvent.currentRows;
        else
          this.pagesToDisplay = (res.count / this.dataTableEvent.currentRows) + 1;
        this.loading = false;
      }
        , err => { console.log(err); });
  }


  onUpload(event) {

    let files = event.files;

    if (files.length > 0)
      this.uploadedFile = files[0];
    this.fileService.UploadFile(this.uploadedFile);
  }

  confirm() {
    this.confirmationService.confirm({
      // message: this.message,
      header: 'Deactivate Users',
      icon: 'fa-times-circle',
      message: 'Are you sure that you want to make this papers Inactive?',
      accept: () => {
        //Actual logic to perform a confirmation
        debugger;
        // this.deleteUsers();
        this.Activate(false);
      }
    });
  }

  activatePapers() {
    this.Activate(true);
  }

  Activate(active: boolean) {
    this.selectedQuestionGroup.map(function (s) { s.isActive = active });
    debugger;
    this.questionService.EnableOrDisableQuestionPapers(this.questionPaperGroup)
      .subscribe(res => {
        debugger;
        console.log(res);
        this.selectedQuestionGroup = [];
        this.serverCall();
      }, err => {
        console.log(err);
      });
  }

}

export interface PapersPaginated {
  count: number;
  papers: any[];
}
