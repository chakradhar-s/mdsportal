import { Component, OnInit } from '@angular/core';
import { UserResultsService } from '../../http-service-registry/services/user-results.service';
import { UserResult } from '../../models/question-set';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public selectedRecord : any;
  public results: UserResult[];
  public columns: any;
  constructor(
    private resultService: UserResultsService
  ) { }

  ngOnInit() {
    this.resultService.GetResults().subscribe((res) => {
      this.results = res;
      console.log(this.results);
    }, err => {
      console.log(err);
    });
    this.columns = [{ field: "questionPaperName", header: "Question Paper name", class:"col-md-3" },
    { field: "sessionId", header: "Session id", class:"col-md-3" },
    { field: "result", header: "Result scored", class:"col-md-1" },
    { field: "attemptedDate", header: "Date of attempt", class:"col-md-3" },
    { field: "",header:"", class:"col-md-2"}];
  }

  showRank(object : any):void{
    debugger;
    // alert(sessionId);
    console.log(object.sessionId);
    if(object != null){
    this.resultService.getRank(object.sessionId)
    .subscribe((res) => {
      this.selectedRecord = res;
      this.selectedRecord.questionPaperName = object.questionPaperName
      this.selectedRecord.attemptedDate = object.attemptedDate;
    }, err => {
      console.log(err);
    });
    }
  }


}