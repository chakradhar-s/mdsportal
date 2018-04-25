import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, Validators } from '@angular/forms';

import { CommonService } from '../http-service-registry/services/common.service';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  public heroForm: FormGroup;
  public FirstName:string= '';
  public LastName:string= '';
  public Company:string= '';
  public Email:string= '';
  public Phone:string= '';
  public Message:string = '';
  

 
  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private commonService: CommonService
  ) { }

  

  ngOnInit() {
    this.spinnerService.show();
    this.heroForm = new FormGroup({
      FirstName: new FormControl(this.FirstName,Validators.required),
      LastName: new FormControl(this.LastName, Validators.required),
      Company: new FormControl(this.Company),
      Email: new FormControl(this.Email),
      Phone: new FormControl(this.Phone),
      Message: new FormControl(this.Message)
    });
  }

  onSubmit() {
    debugger;
    let form = this.heroForm.value;
    this.commonService.GetInTouch(form).subscribe(() => {
debugger;
    },(error:Error) => console.log(error));
  }


  ngAfterViewInit() {
    this.spinnerService.hide();
  }

}
