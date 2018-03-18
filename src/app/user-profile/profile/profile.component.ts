import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

import { UserLoginValidators } from '../../login-user/login/login-user.validators';
import { LoginService } from '../../http-service-registry/services/login-service.service';
import { SignUpService } from '../../http-service-registry/services/signup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileForm = this.fb.group({
    firstName: ['',
      [Validators.required]],
    lastName: ['',
      [Validators.required]],
    collegeName: [''
    ],
    sYear: ['',
    ],
    state: ['',
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
      UserLoginValidators.validEmailId]
    ],
    declarationAcceptance: this.fb.group({
      is_accepted: [false, [Validators.required, this.userAcceptance.bind(this)]]
    })
  });

  constructor(private router: Router, private spinnerService: Ng4LoadingSpinnerService, private fb: FormBuilder, private login: LoginService, private signup: SignUpService) {

  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.spinnerService.hide();
  }

  invalid(name: string) {
    return (
      this.profileForm.get(`${name}`).hasError('invalidMobileNumber') &&
      this.profileForm.get(`${name}`).dirty &&
      !this.required(`${name}`)
    );
  }

  get emailvalid() {
    return (
      this.profileForm.get('emailId').hasError('invalidEmailId') &&
      this.profileForm.get('emailId').dirty &&
      !this.required('emailId')
    );
  }

  required(name: string) {
    return (
      this.profileForm.get(`${name}`).hasError('required') &&
      this.profileForm.get(`${name}`).touched
    );
  }

  userAcceptance(control: AbstractControl) {
    return control.value ? null : { notaccepted: true };
  }

  get validAcceptance() {
    return (
      this.profileForm.get('declarationAcceptance.is_accepted').hasError('notaccepted') &&
      this.profileForm.get('declarationAcceptance.is_accepted').dirty &&
      !this.required("declarationAcceptance.is_accepted")
    );
  }


  onSubmit() {
    if (this.profileForm.valid) {
      this.spinnerService.show();
      this.signup.registerUser(this.profileForm.value).subscribe((result) => {

      }, (error) => {
        this.spinnerService.hide();

      }, () => {
        this.spinnerService.hide();
      });
    }
  }

  cancel(){
    this.router.navigate(['/home']);
  }
}
