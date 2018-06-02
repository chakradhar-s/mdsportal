import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, Validators } from '@angular/forms';
import { UserLoginValidators } from '../login-user/login/login-user.validators';

import { CommonService } from '../http-service-registry/services/common.service';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  public submitTriggered: boolean = false;
  public contactusForm = this.fb.group({
    FirstName: ['',
      [Validators.required]],
    LastName: ['',
      [Validators.required]],
    Company: [''],
    Message: [''],
    College: [''],
    State: [''],
    ReferredBy: [''],
    Phone: ['',
      [Validators.required,
      UserLoginValidators.validMobileNumber]
    ],

    Email: ['',
      [Validators.required,
      UserLoginValidators.validEmailId]
    ]
  });



  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private commonService: CommonService,
    private fb: FormBuilder
  ) { }



  ngOnInit() {
    this.spinnerService.show();
  }

  onSubmit() {
    this.submitTriggered = true;
    let form = this.contactusForm.value;
    this.commonService.GetInTouch(form).subscribe(() => {

    }, (error: Error) => console.log(error));
  }

  get emailvalid() {
    return (
      this.contactusForm.get('Email').hasError('invalidEmailId') &&
      this.contactusForm.get('Email').dirty &&
      !this.required('Email')
    );
  }

  required(name: string) {
    return (
      this.contactusForm.get(`${name}`).hasError('required') &&
      this.contactusForm.get(`${name}`).touched
    );
  }

  invalid(name: string) {
    return (
      this.contactusForm.get(`${name}`).hasError('invalidMobileNumber') &&
      this.contactusForm.get(`${name}`).dirty &&
      !this.required(`${name}`)
    );
  }

  rebuildForm() {
    this.submitTriggered = false;
    this.contactusForm.reset({
      FirstName: '',
      LastName: '',
      Email: '',
      Phone: '',
      Company: '',
      Message: '',
      College: '',
      State: '',
      ReferredBy: '',
    });
  }


  ngAfterViewInit() {
    this.spinnerService.hide();
  }

}
