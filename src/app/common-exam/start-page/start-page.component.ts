import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

enum StartPageWizard {
  Step1,
  Step2
}

@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  @Input() parent: FormGroup;
  @Output()
  started = new EventEmitter<boolean>();

  wizard = StartPageWizard;
  currentStep: number;

  constructor() { }

  ngOnInit() {
    this.currentStep = this.wizard.Step1;
   
    // this.parent.get("start.disclaimer").valueChanges
    //   .subscribe(r => console.log(r));
  }

  move(step: number) {
    this.currentStep = step;
  }

  start() {
    this.started.emit(true);
  }

}
