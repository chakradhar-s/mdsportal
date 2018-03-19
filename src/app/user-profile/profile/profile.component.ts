import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

import { UserLoginValidators } from '../../login-user/login/login-user.validators';
import { LoginService } from '../../http-service-registry/services/login-service.service';
import { SignUpService } from '../../http-service-registry/services/signup.service';

import { Registration } from '../../models/registration.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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

  constructor(private router: Router, private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService, private fb: FormBuilder, private login: LoginService, private signup: SignUpService) {

  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const user = data["user"];    
      this.profileForm.get('userId').setValue(user.userId);
      this.profileForm.get('firstName').setValue(user.firstName);
      this.profileForm.get('lastName').setValue(user.lastName);
      this.profileForm.get('collegeName').setValue(user.collegeName);
      this.profileForm.get('sYear').setValue(user.sYear);
      this.profileForm.get('state').setValue(user.referredBy);
      this.profileForm.get('mobileNumber').setValue(user.mobileNumber);
      this.profileForm.get('whatsAPPNumber').setValue(user.whatsAPPNumber);
      this.profileForm.get('emailId').setValue(user.emailId);
    });
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
      this.signup.updateRegisterUser(this.profileForm.value).subscribe((result) => {

      }, (error) => {
        this.spinnerService.hide();

      }, () => {
        this.spinnerService.hide();
      });
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  managePassword(){
    
  }
}
