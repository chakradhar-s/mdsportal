import { Component, OnInit } from '@angular/core';
import { UserResultsService } from '../../http-service-registry/services/user-results.service';
import { UserResult } from '../../models/question-set';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

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
    this.columns = [{ field: "questionPaperName", header: "Question Paper name" },
    { field: "sessionId", header: "Session id" },
    { field: "result", header: "Result scored" },
    { field: "attemptedDate", header: "Date of attempt" }];
  }

}
