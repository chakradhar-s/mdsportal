import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamDetailComponent } from './exam-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ExamDetailModule
  ],
  declarations: [ExamDetailComponent]
})
export class ExamDetailModule { }
