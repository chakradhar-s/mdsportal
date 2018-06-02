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
import { Alert } from '../models/alert.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserLoginValidators } from '../login-user/login/login-user.validators';

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
  public alerts: Array<Alert> = [];
  private timerModel;

  public timerForm = this.fb.group({
    timer: ['',
    {
      validators: [Validators.required,
      UserLoginValidators.validTimer],
      updateOn: 'blur'
    }],
    qpaper: ['']
  });


  public dataTableEvent: DataTableTrackEvent = { currentFilter: '', currentFirstRec: 1, currentRows: 10 };

  constructor(private fileService: FileUploadService,
    private questionService: QuestionpaperService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private modalService: NgbModal) {

    this.allChecked = false;
  }

  ngOnInit() {
    this.totalRecords = 10;
    this.pagesToDisplay = 3;
    this.columns = [
      { field: "questionPaperId", header: "Question Paper ID" },
      { field: "isActive", header: "Is Active" },
      { field: "fileName", header: "File Name" },
      { field: "timer", header: "Timer" }
    ];

  }

  loadPapersLazy(event: LazyLoadEvent) {
    this.loading = true;
    this.dataTableEvent = { currentFirstRec: event.first + 1, currentRows: event.rows, currentFilter: event.globalFilter };
    this.serverCall();
  }
  serverCall() {
    this.questionService.getAllPapersPaged(this.dataTableEvent.currentFirstRec, this.dataTableEvent.currentRows, this.dataTableEvent.currentFilter)
      .subscribe((res: PapersPaginated) => {
        debugger;
        this.questionPaperGroup = res.papers;
        this.totalRecords = res.count;
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
    this.fileService.UploadFile(this.uploadedFile).subscribe(
      res => {
        this.alerts = [{
          id: 1,
          type: 'success',
          message: 'Question Paper uploaded Successfully!',
        }];
      },
      err => {
        console.log(err);
        this.alerts = [{
          id: 1,
          type: 'danger',
          message: 'Uploading Failed',
        }];
      }
    );
  }

  confirm() {
    this.confirmationService.confirm({
      // message: this.message,
      header: 'Deactivate Users',
      icon: 'fa-times-circle',
      message: 'Are you sure that you want to make this papers Inactive?',
      accept: () => {
        //Actual logic to perform a confirmation

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

    this.questionService.EnableOrDisableQuestionPapers(this.questionPaperGroup)
      .subscribe(res => {
        this.selectedQuestionGroup = [];
        this.serverCall();
      }, err => {
        console.log(err);
      });
  }

  public closeAlert(alert: Alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  timerRequired(name: string) {
    return (
      this.timerForm.get(`${name}`).hasError('required') &&
      this.timerForm.get(`${name}`).touched
    );
  }

  public timerSubmit() {
    console.log('test');
    // this.questionService.submitMobileVerification(this.otpVerificationForm.get('otp').value).subscribe((t) => {
    //   if (t && t.verified) {
    //     this.alerts = [{
    //       id: 1,
    //       type: 'success',
    //       message: 'Mobile number is verified successfully!',
    //     }];
    //     this.mobileVerificationIsRequired = false;
    //     this.otpModal.close();
    //   }
    // });
    this.questionService.SetTimerForQuestionPaper(this.timerForm.get('timer').value, this.timerForm.get('qpaper').value).subscribe((t) => {
      console.log('completed call and set message');
      this.alerts = [{
        id: 1,
        type: 'success',
        message: 'timer has been set!',
      }];
      this.serverCall();
      this.timerModel.close();
    }, (error) => {
      console.log(error);
    });
  }

  private openVerticallyCentered(content) {
    this.timerModel = this.modalService.open(content, {
      centered: true, backdrop: 'static',
      keyboard: false
    });
  }

  public openTimerDialog(input: any, model_name: string) {
    debugger;
    this.timerForm.setValue({ 'timer': '', 'qpaper': '' });
    this.timerForm.get('qpaper').setValue(input.questionPaperId);
    // input.questionPaperId
    this.openVerticallyCentered(model_name);
    
  }

  invalid(name: string) {
    return (
      this.timerForm.get(`${name}`).hasError('invalidTimer') &&
      this.timerForm.get(`${name}`).dirty &&
      !this.required(`${name}`)
    );
  }
  required(name: string) {
    return (
      this.timerForm.get(`${name}`).hasError('required') &&
      this.timerForm.get(`${name}`).touched
    );
  }

}

export interface PapersPaginated {
  count: number;
  papers: any[];
}
