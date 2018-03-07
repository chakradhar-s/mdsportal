import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoExamRoutingModule } from './demo-exam-routing.module';
import { DemoExamComponent } from './demo-exam.component';
import { SideBarComponent } from '../common-exam/side-bar/side-bar.component';
import { ExamDetailComponent } from '../common-exam/exam-detail/exam-detail.component';

@NgModule({
  imports: [
    CommonModule,
    DemoExamRoutingModule

  ],
  declarations: [DemoExamComponent, SideBarComponent,ExamDetailComponent]
})
export class DemoExamModule { }
