import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { UserLoginValidators } from '../../login-user/login/login-user.validators';
import { LoginService } from '../../http-service-registry/services/login-service.service';
import { SignUpService } from '../../http-service-registry/services/signup.service';
import { VerificationService } from '../../http-service-registry/services/verification.service';

import { Registration } from '../../models/registration.interface';
import { Alert } from '../../models/alert.interface';

// export const uploadUrl:string="https://ec2-52-66-160-163.ap-south-1.compute.amazonaws.com/mdservice/api/users/profilepicurl";
export const uploadUrl: string = "http://localhost:5000/mdservice/api/users/profilepicurl";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileName: string = "";
  public profileUrl: string = "assets/images/anonym-person.png";
  public profileForm = this.fb.group({
    userId: ['',
      [Validators.required]],
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
    ]
  });

  public alerts: Array<Alert> = [];
  public imageBackground: string = "e51lmc";
  public imageUploadUrl: string = "";
  public emailVerificationIsRequired: boolean = false;
  public mobileVerificationIsRequired: boolean = false;
  public verificationForm = this.fb.group({
    verification: ['']
  });
  private otpModal;

  public otpVerificationForm = this.fb.group({
    otp: ['',
      [Validators.required]]
  });

  private mobilenotavailable: boolean = false;
  private emailnotavailable: boolean = false;
  public disableProfileForm: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private fb: FormBuilder,
    private login: LoginService,
    private signup: SignUpService,
    private modalService: NgbModal,
    private verification: VerificationService) {

  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const user = data["user"];
      this.profileName = `${user.firstName} ${user.lastName}`;
      this.signup.getUserPic(user.userId).subscribe((re) => {
        this.profileUrl = re.imageUrl;
      });
      this.profileForm.get('userId').setValue(user.userId);
      this.profileForm.get('firstName').setValue(user.firstName);
      this.profileForm.get('lastName').setValue(user.lastName);
      this.profileForm.get('collegeName').setValue(user.collegeName);
      this.profileForm.get('sYear').setValue(user.sYear);
      this.profileForm.get('state').setValue(user.referredBy);
      this.profileForm.get('mobileNumber').setValue(user.mobileNumber);
      this.profileForm.get('whatsAPPNumber').setValue(user.whatsAPPNumber);
      this.profileForm.get('emailId').setValue(user.emailId);
      this.imageUploadUrl = uploadUrl + `/${user.userId}`;
      this.profileForm.valueChanges.subscribe(t => {
        console.log(t);
        this.disableProfileForm = false;
      });
    });

    this.showVerifyButtons();

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

  onSubmit() {
    if (this.profileForm.valid) {
      this.spinnerService.show();
      const mobileNumberAvailable = this.verification.checkMobileNumberAvailable(this.profileForm.get('mobileNumber').value);
      const emailAvailable = this.verification.checkEmailIdAvailable(this.profileForm.get('emailId').value);
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
            this.signup.updateRegisterUser(this.profileForm.value).subscribe((result) => {
              this.alerts = [{
                id: 1,
                type: 'success',
                message: 'Details are saved successfully!',
              }];
              this.showVerifyButtons();
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
        }, () => {

        });

    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  managePassword() {
    this.router.navigate(['/forgot_password']);
  }

  public closeAlert(alert: Alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public changeBackground(event, content) {
    if (event.type == "mouseover") {
      this.imageBackground = "e51lmc";
    }
    else if (event.type == "mouseout") {
      this.imageBackground = "";
    }
    else if (event.type == "click") {
      this.openVerticallyCentered(content);
    }
  }

  private openVerticallyCentered(content) {
    this.otpModal = this.modalService.open(content, {
      centered: true, backdrop: 'static',
      keyboard: false
    });
  }

  public uploadedPaths(paths: Array<string>) {
    if (paths && paths.length) {
      this.profileUrl = paths[0];
    }
  };

  sendEmailVerification() {
    this.verification.sendEmailVerification().subscribe();
  }

  sendMobileVerification(content) {
    this.verification.sendMobileVerification().subscribe(
      (t) => {
        debugger;
        this.openVerticallyCentered(content);
      },
      (e) => { },
      () => {
      }
    );
  }

  otpSubmit() {
    this.verification.submitMobileVerification(this.otpVerificationForm.get('otp').value).subscribe((t) => {
      if (t && t.verified) {
        this.alerts = [{
          id: 1,
          type: 'success',
          message: 'Mobile number is verified successfully!',
        }];
        this.mobileVerificationIsRequired = false;
        this.otpModal.close();
      }
    });
  }


  showVerifyButtons() {
    this.verification.getEmailVerificationStatus().subscribe(
      (x) => {
        if (x && x.pending) {
          this.emailVerificationIsRequired = true;
        }
      },
      error => {

      },
      () => {

      }
    );
    this.verification.getMobileVerificationStatus().subscribe(
      (x) => {
        if (x && x.pending) {
          this.mobileVerificationIsRequired = true;
        }
      },
      error => {

      },
      () => {

      }
    );
  }


  otprequired(name: string) {
    return (
      this.otpVerificationForm.get(`${name}`).hasError('required') &&
      this.otpVerificationForm.get(`${name}`).touched
    );
  }

  public get checkmobile() {
    return this.mobilenotavailable;
  }

  public get checkemail() {
    return this.emailnotavailable;
  }
}
