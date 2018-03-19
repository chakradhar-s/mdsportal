import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

import { UserLoginValidators } from './login-user.validators';
import { LoginService } from '../../http-service-registry/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  public loginForm = this.fb.group({
    userName: ['',
      [Validators.required,
      UserLoginValidators.validUserName]],
    password: ['',
      [Validators.required,
      UserLoginValidators.validPassword]]
  });

  public inValidCredentials: boolean = false;

  public loginservice: LoginService;

  constructor(private router: Router, private spinnerService: Ng4LoadingSpinnerService, private fb: FormBuilder, private login: LoginService) {
    this.loginservice = login;
  }

  ngOnInit() {
    this.spinnerService.show();
    this.login.loginPageRedirect(true);
    this.login.onLoginFail.subscribe((fail: boolean) => {
      this.inValidCredentials = fail;
    });
  }

  ngAfterViewInit() {
    this.spinnerService.hide();
  }

  register() {
    this.router.navigate(['/register'], { replaceUrl: true });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login.validateUser({ userName: this.loginForm.get('userName').value, password: this.loginForm.get('password').value });
    }
  }

  get invalid() {
    this.inValidCredentials = false;
    return (
      this.loginForm.get('userName').hasError('invalidUserName') &&
      this.loginForm.get('userName').dirty &&
      !this.required('userName')
    );
  }

  get passvalid() {
    this.inValidCredentials = false;
    return (
      this.loginForm.get('password').hasError('invalidPassword') &&
      this.loginForm.get('password').dirty &&
      !this.required('password')
    );
  }

  required(name: string) {
    return (
      this.loginForm.get(`${name}`).hasError('required') &&
      this.loginForm.get(`${name}`).touched
    );
  }


}
