import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoExamRoutingModule } from './demo-exam-routing.module';
import { DemoExamComponent } from './demo-exam.component';
import { SideBarModule } from '../common-exam/side-bar/side-bar.module';
import { ExamDetailModule } from '../common-exam/exam-detail/exam-detail.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    DemoExamRoutingModule,
    SideBarModule,
    ExamDetailModule,
    NgbModule
  ],
  declarations: [DemoExamComponent]
})
export class DemoExamModule { }
