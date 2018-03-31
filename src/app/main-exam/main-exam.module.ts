import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainExamRoutingModule } from './main-exam-routing.module';
import { CommonExamModule } from '../common-exam/common-exam.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MainExamComponent } from './main-exam.component';

@NgModule({
  imports: [
    CommonModule,
    MainExamRoutingModule,
    CommonExamModule,
    ReactiveFormsModule
  ],
  declarations: [MainExamComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MainExamModule { }
