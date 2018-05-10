import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

import { UserLoginValidators } from '../login-user/login/login-user.validators';
import { LoginService } from '../http-service-registry/services/login-service.service';
import { SignUpService } from '../http-service-registry/services/signup.service';
import { Alert } from '../models/alert.interface';
import { VerificationService } from '../http-service-registry/services/verification.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, AfterViewInit {
  private acceptUserAggrement: boolean = false;
  public alerts: Array<Alert> = [];
  private mobilenotavailable: boolean = false;
  private emailnotavailable: boolean = false;
  

  public registerForm = this.fb.group({
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
    password: ['',
      [Validators.required,
      UserLoginValidators.validPassword]],
    referencedBy: ['',
    ],
    mobileNumber: ['',
      {
        validators: [Validators.required,
        UserLoginValidators.validMobileNumber],
        updateOn: 'blur'
      }
    ],
    whatsAPPNumber: ['',
      {
        validators: [Validators.required,
        UserLoginValidators.validMobileNumber],
        updateOn: 'blur'
      }
    ],
    emailId: ['',
      {
        validators: [Validators.required,
        UserLoginValidators.validEmailId],
        updateOn: 'blur'
      }
    ],
    declarationAcceptance: this.fb.group({
      is_accepted: [false, [Validators.required, this.userAcceptance.bind(this)]]
    })
  });

  constructor(private router: Router, private spinnerService: Ng4LoadingSpinnerService, private fb: FormBuilder, 
    private login: LoginService, private signup: SignUpService,private verification: VerificationService) {

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

  get validAcceptance() {
    return (
      this.registerForm.get('declarationAcceptance.is_accepted').hasError('notaccepted') &&
      this.registerForm.get('declarationAcceptance.is_accepted').dirty &&
      !this.required("declarationAcceptance.is_accepted")
    );
  }


  onSubmit() {
    // if (this.registerForm.valid) {
    //   this.spinnerService.show();
    //   this.signup.registerUser(this.registerForm.value).subscribe((result) => {
    //     this.alerts = [{
    //       id: 1,
    //       type: 'success',
    //       message: 'Details are saved successfully!',
    //     }];
    //   }, (error) => {
    //     this.spinnerService.hide();
    //     this.alerts = [{
    //       id: 2,
    //       type: 'error',
    //       message: 'Details are not saved!',
    //     }];
    //   }, () => {
    //     debugger;
    //     this.spinnerService.hide();
    //     // console.log({ userName: this.registerForm.get('emailId').value, password: this.registerForm.get('password').value });
    //     // this.login.validateUser({ userName: this.registerForm.get('emailId').value, password: this.registerForm.get('password').value });
    //     this.router.navigate(['/user-management']);

    //   });
    // }

    // new code changes 
    if (this.registerForm.valid) {
      this.spinnerService.show();
      const mobileNumberAvailable = this.verification.checkMobileNumberAvailable(this.registerForm.get('mobileNumber').value);
      const emailAvailable = this.verification.checkEmailIdAvailable(this.registerForm.get('emailId').value);
      Observable
        .forkJoin(mobileNumberAvailable, emailAvailable)
        .subscribe(([mobile, email]) => {
          if (!email.emailIdAvailable) {
            this.emailnotavailable = true;
          }
          if (!mobile.mobileNumberAvailable) {
            this.mobilenotavailable = true;
          }
          if (email.emailIdAvailable && mobile.mobileNumberAvailable) {
            this.signup.registerUser(this.registerForm.value).subscribe((result) => {
              this.alerts = [{
                id: 1,
                type: 'success',
                message: 'Details are saved successfully!',
              }];
              // this.showVerifyButtons();
              this.router.navigate(['/user-management']);
            }, (error) => {
              this.spinnerService.hide();
              this.alerts = [{
                id: 1,
                type: 'danger',
                message: 'Save Failed',
              }];

            }, () => {
              this.spinnerService.hide();
             
            });
          }
          else {
            this.spinnerService.hide();
          }
        }, err => {
          this.spinnerService.hide();
          this.alerts = [{
            id: 1,
            type: 'danger',
            message: 'Save Failed',
          }];
        }, () => {

        });

    }
    //end here
  }

  public closeAlert(alert: Alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public get checkmobile() {
    return this.mobilenotavailable;
  }

  public get checkemail() {
    return this.emailnotavailable;
  }

  cancel(){
    this.router.navigate(['/user-management']);
  }

}
