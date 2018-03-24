import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DemoExamRoutingModule } from './demo-exam-routing.module';
import { DemoExamComponent } from './demo-exam.component';
import {CommonExamModule } from '../common-exam/common-exam.module';

@NgModule({
  imports: [
    CommonModule,
    DemoExamRoutingModule,   
    CommonExamModule,
    ReactiveFormsModule
  ],
  declarations: [DemoExamComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoExamModule { }
