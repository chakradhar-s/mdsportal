import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { DataReportsService } from '../../http-service-registry/services/data-reports.service';

import 'rxjs/Rx';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.scss']
})
export class RanksComponent implements OnInit {

  constructor(private dataReportsService: DataReportsService,
    private spinnerService: Ng4LoadingSpinnerService) { }
  @ViewChild("tpl") tpl: TemplateRef<any>;

  ngOnInit() {
    this.spinnerService.show();
    this.dataReportsService.getRankReports().subscribe(
      (data) => {
        this.downloadFile(data);
      },
      error => { 
        console.log("Error downloading the file."); 
        this.spinnerService.hide(); },
      () => console.info("OK"));
  }

  private downloadFile(data) {
    var blob = new Blob([data._body], { type: 'text/csv' });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, "ranks.csv");
    } else {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = "ranks.csv";
      this.spinnerService.hide();
      this.tpl.createEmbeddedView(a);
      a.click();
    }
  }

}
