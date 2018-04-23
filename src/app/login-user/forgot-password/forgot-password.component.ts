import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

import { UserLoginValidators } from '../login/login-user.validators';
import { LoginService } from '../../http-service-registry/services/login-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public requestResetPasswordForm = this.fb.group({
    userName: ['',
      [Validators.required,
      UserLoginValidators.validEmailId]]   
  });

  public loginservice: LoginService;

  constructor(private router: Router, private spinnerService: Ng4LoadingSpinnerService, private fb: FormBuilder, private login: LoginService) { 
    this.loginservice = login;
  }

  ngOnInit() {
    this.spinnerService.show();
  }

  ngAfterViewInit() {
    this.spinnerService.hide();
    this.login.loginPageRedirect(true);
  }

  onSubmit() {
    if (this.requestResetPasswordForm.valid) {
      this.login.sendResetPassword(this.requestResetPasswordForm.get('userName').value).subscribe(()=>{

      },(error)=>{
        this.router.navigate(['/password_link']);
      },()=>{
        this.router.navigate(['/password_link']);
      }) ;
    }
  }

  required(name: string) {   
    return (
      this.requestResetPasswordForm.get(`${name}`).hasError('required') &&
      this.requestResetPasswordForm.get(`${name}`).touched
    );
  }

  get invalid() {   
    return (
      this.requestResetPasswordForm.get('userName').hasError('invalidEmailId') &&
      this.requestResetPasswordForm.get('userName').dirty &&
      !this.required('userName')
    );
  }

}
