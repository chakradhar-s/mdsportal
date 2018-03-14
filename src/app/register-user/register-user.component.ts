import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

import { UserLoginValidators } from '../login-user/login/login-user.validators';
import { LoginService } from '../http-service-registry/services/login-service.service';

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
    password: ['',
      [Validators.required,
      UserLoginValidators.validPassword]],
    sYear: ['',
    ],
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
      UserLoginValidators.validPassword]
    ]
  });

  constructor(private router: Router, private spinnerService: Ng4LoadingSpinnerService, private fb: FormBuilder, private login: LoginService) {
   
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

  required(name: string) {   
    return (
      this.registerForm.get(`${name}`).hasError('required') &&
      this.registerForm.get(`${name}`).touched
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
     
    }
  }

}
