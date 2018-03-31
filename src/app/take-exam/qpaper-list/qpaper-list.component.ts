import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { QuestionPaper } from '../../models/question-paper.interface';


@Component({
  selector: 'app-qpaper-list',
  templateUrl: './qpaper-list.component.html',
  styleUrls: ['./qpaper-list.component.scss']
})
export class QpaperListComponent implements OnInit {
  cols: any[];
  papers: QuestionPaper[] = [];
  selectedPaper: QuestionPaper = { fileName: '', isActive: false, questionPaperId: '' };
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.cols = [
        { field: 'fileName', header: 'Test Name' },
      ];
      this.papers = data["questionPapers"];
    });
  }

  onRowSelect(event) {
    console.log(event.data.questionPaperId);
    this.router.navigate(['/demo-exam', event.data.questionPaperId], { replaceUrl: true });
  }

}
