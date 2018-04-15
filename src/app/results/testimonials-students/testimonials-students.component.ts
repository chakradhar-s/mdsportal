import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../http-service-registry/services/exam.service';


@Component({
  selector: 'app-testimonials-students',
  templateUrl: './testimonials-students.component.html',
  styleUrls: ['./testimonials-students.component.scss']
})
export class TestimonialsStudentsComponent implements OnInit {

  public result : any = {};
  public answeredPercent = 0;
  public unAnsweredPercent = 0;
  public attendedExamsPercent = 0;
  public skippedExamsPercent = 0;
  constructor(private service : ExamService) { }

  ngOnInit() {
    this.onLoad();
  }

  onLoad(){
    debugger;
    this.service.getAnalytics()
    .subscribe((response:Response) => {
        this.result = response;
        console.log(this.result);
        this.answeredPercent = (this.result.totalAnswered/this.result.totalQuestions)*100;
        this.unAnsweredPercent = (this.result.totalUnAnswered/this.result.totalQuestions)*100;
        this.attendedExamsPercent = (this.result.totalExamsAttended/this.result.totalPapers)*100;
        this.skippedExamsPercent = (this.result.skippedExams/this.result.totalQuestions)*100;
    });
    
  }

}
