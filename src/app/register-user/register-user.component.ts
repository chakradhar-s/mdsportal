import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

import { UserLoginValidators } from '../login-user/login/login-user.validators';
import { LoginService } from '../http-service-registry/services/login-service.service';
import { SignUpService } from '../http-service-registry/services/signup.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, AfterViewInit {
  private acceptUserAggrement: boolean = false;

  public registerForm = this.fb.group({
    firstName: ['',
      [Validators.required]],
    lastName: ['',
      [Validators.required]],
    college: ['',
      [Validators.required]],
    sYear: ['',
    ],
    state: ['',
    ],
    password: ['',
      [Validators.required,
      UserLoginValidators.validPassword]],
    referencedBy: ['',
    ],
    mobileNumber: ['',
      [Validators.required,
      UserLoginValidators.validMobileNumber]
    ],
    whatsAPPNumber: ['',
      [Validators.required,
      UserLoginValidators.validMobileNumber]
    ],
    emailId: ['',
      [Validators.required,
      UserLoginValidators.validEmailId]
    ],
    declarationAcceptance: this.fb.group({
      is_accepted: [false, [Validators.required,this.userAcceptance.bind(this)]]
    })
  });

  constructor(private router: Router, private spinnerService: Ng4LoadingSpinnerService, private fb: FormBuilder, private login: LoginService, private signup: SignUpService) {

  }

  ngOnInit() {
    this.spinnerService.show();
  }

  ngAfterViewInit() {
    this.spinnerService.hide();
  }

  invalid(name: string) {
    return (
      this.registerForm.get(`${name}`).hasError('invalidMobileNumber') &&
      this.registerForm.get(`${name}`).dirty &&
      !this.required(`${name}`)
    );
  }

  get passvalid() {
    return (
      this.registerForm.get('password').hasError('invalidPassword') &&
      this.registerForm.get('password').dirty &&
      !this.required('password')
    );
  }

  get emailvalid() {
    return (
      this.registerForm.get('emailId').hasError('invalidEmailId') &&
      this.registerForm.get('emailId').dirty &&
      !this.required('emailId')
    );
  }

  required(name: string) {
    return (
      this.registerForm.get(`${name}`).hasError('required') &&
      this.registerForm.get(`${name}`).touched
    );
  }

  userAcceptance(control: AbstractControl) {
    return control.value ? null : { notaccepted: true };
  }

  get validAcceptance(){
    return (
      this.registerForm.get('declarationAcceptance').get('is_accepted').hasError('notaccepted') &&
      this.registerForm.get('declarationAcceptance').get('is_accepted').dirty &&
      !(this.registerForm.get('declarationAcceptance').get('is_accepted').hasError('required') &&
      this.registerForm.get('declarationAcceptance').get('is_accepted').touched)
    );
  }


  onSubmit() {
    if (this.registerForm.valid) {
      this.spinnerService.show();
      this.signup.registerUser(this.registerForm.value).subscribe((result) => {

      }, (error) => {

      }, () => {
        this.login.validateUser({ userName: this.registerForm.get('emailId').value, password: this.registerForm.get('password').value });

      });
    }
  }

}
