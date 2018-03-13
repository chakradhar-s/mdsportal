import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    userName: ['',
      [Validators.required,
      UserLoginValidators.validUserName]],
    password: ['',
      [Validators.required,
        UserLoginValidators.validPassword]]
  });

  constructor(private router: Router, private spinnerService: Ng4LoadingSpinnerService, private fb: FormBuilder, private login: LoginService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.login.loginPageRedirect(true);
  }

  ngAfterViewInit() {
    this.spinnerService.hide();
  }
  
  register() {
    this.router.navigate(['/register/user'], { replaceUrl: true });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login.validateUser({ userName: this.loginForm.get('userName').value, password: this.loginForm.get('password').value });
    }
  }

  get invalid() {
    return (
      this.loginForm.get('userName').hasError('invalidUserName') &&
      this.loginForm.get('userName').dirty &&
      !this.required('userName')
    );
  }

  get passvalid(){
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
