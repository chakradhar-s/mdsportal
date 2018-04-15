import { Component, OnInit, Input } from '@angular/core';
import {ChartModule} from 'primeng/chart';

@Component({
  selector: 'subject-analysis-component',
  templateUrl: './subject-analysis-component.component.html',
  styleUrls: ['./subject-analysis-component.component.scss']
})
export class SubjectAnalysisComponentComponent implements OnInit {
public data: any;
public barData : any;
@Input() subjectData : any;
  constructor() {
    setTimeout(() => {
      
      this.data = {
        labels: this.subjectData.complexity,
        datasets: [
            {
                data: this.subjectData.complexityAnswered,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#e104f9"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#e104f9"
                ]
            }]    
        };
        let d = [];
        this.subjectData.complexityAnswered.forEach(element => {
          d.push(element);
        });
        d.push(this.subjectData.answered);
        d.push(this.subjectData.unAnswered);
        debugger;
        this.barData ={
          labels: ['Hard','Medium', 'Low','Basic', 'Answered', 'UnAnswered'],
          datasets: [
              {
                  label: 'My First dataset',
                  backgroundColor: '#42A5F5',
                  borderColor: '#1E88E5',
                  data: [
                    this.subjectData.totalHardQuestions,
                    this.subjectData.totalMediumQuestions,
                    this.subjectData.totalLowQuestions,
                    this.subjectData.totalBasicQuestions, 0,0
                  ]
              },
              {
                  label: 'My Second dataset',
                  backgroundColor: '#9CCC65',
                  borderColor: '#7CB342',
                  data: d
              }
          ]
      }
    }, 5000);
    

   }

  ngOnInit() {
  }

}
