import { Component, OnInit } from '@angular/core';
import { UserResultsService } from '../../http-service-registry/services/user-results.service';
import { UserResult } from '../../models/question-set';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public selectedRecord: any = {};
  public currentRecord: any = {};
  public results: UserResult[] = [];
  public columns: any = [];
  public togglePanel: boolean = false;
  constructor(
    private resultService: UserResultsService
  ) { }

  ngOnInit() {
    this.allRanks();
    this.activeSessionRank();
  }

  allRanks() {
    this.resultService.GetResults().subscribe((res) => {
      this.results = res;
      console.log(this.results);
    }, err => {
      console.log(err);
    });
    this.columns = [{ field: "questionPaperName", header: "Question Paper name", width: '40%' },
    // { field: "sessionId", header: "Session id", class: "col-md-3" },
    { field: "result", header: "Score Obtained", width: '10%' },
    { field: "attemptedDate", header: "Date of attempt", width: '30%' },
    { field: "rank", header: "Rank details", width: '20%' }];
  }

  activeSessionRank() {
    this.resultService.currentSessionResult()
      .subscribe((res) => {
        this.currentRecord = res;
        let t = this.results.find(x => x.sessionId == res.sessionId);
        this.currentRecord.questionPaperName = t.questionPaperName
        this.currentRecord.attemptedDate = t.attemptedDate;
        this.togglePanel = true;
        this.results.find(x => x.sessionId == t.sessionId).rank = res.rank;
      }, err => {
        console.log(err);
      });
  }

  showRank(object: any): void {
    console.log(object.sessionId);
    if (object != null) {
      this.resultService.getRank(object.sessionId)
        .subscribe((res) => {
          this.selectedRecord = res;
          this.selectedRecord.questionPaperName = object.questionPaperName
          this.selectedRecord.attemptedDate = object.attemptedDate;
          // this.togglePanel = true;
          this.results.find(x => x.sessionId == object.sessionId).rank = res.rank;
        }, err => {
          console.log(err);
        });
    }
  }

  toggleRankPanel(): void {
  
    this.togglePanel = false;
  }


}