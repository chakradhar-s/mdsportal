import { Component, OnInit } from '@angular/core';
import { Nav } from '../models/nav.interface';
import { LoginService } from '../http-service-registry/services/login-service.service';
import { UserType } from '../models/user.type.interface';
import { ProfileAccordion } from '../models/profile-accordion.interface';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {

  public nav: Nav[];
  public loggedIn: boolean;
  public profileaccordion: ProfileAccordion;

  private readonly _defaultNav: Nav[];
  private readonly _studentNav: Nav[];
  private readonly _adminNav: Nav[];


  private _userType: UserType;
  constructor(private _login: LoginService) {
    this._defaultNav = [{ exact: true, link: '/home', name: 'Home' },
    { exact: true, link: '/about', name: 'About us' },
    { exact: true, link: '/testimonials', name: 'Results' },
    { exact: true, link: '/payment', name: 'Payment  |  Schedule & PP Books' },
    { exact: true, link: '/s-strategy', name: 'svc' },
    { exact: true, link: '/demo-exam', name: 'Demo Exam' },
    { exact: true, link: '/login/user', name: 'Login' },
    { exact: true, link: '/contactus', name: 'Contact Us' }];

    this._studentNav = [{ exact: true, link: '/home', name: 'Home' },
    { exact: true, link: '/payment', name: 'Payment  |  Schedule & PP Books' },
    { exact: true, link: '/s-strategy', name: 'svc' },
    { exact: true, link: '/demo-exam', name: 'Demo Exam' },
    { exact: true, link: '/contactus', name: 'Take Exam' }];

    this._adminNav = [{ exact: true, link: '/home', name: 'Home' },
    { exact: true, link: '/about', name: 'About us' },
    { exact: true, link: '/testimonials', name: 'Results' },
    { exact: true, link: '/payment/student', name: 'Payment  |  Schedule & PP Books' },
    { exact: true, link: '/s-strategy', name: 'svc' },
    { exact: true, link: '/demo-exam', name: 'Demo Exam' },
    { exact: true, link: '/register/user', name: 'Register' },
    { exact: true, link: '/contactus', name: 'Contact Us' }];

    this.profileaccordion = { image_default: true, image_path: "", nav_items: [{ link: '', exact: false, name: '' }] };
  }

  ngOnInit() {
    this._login.userType.subscribe((uType) => {
      this._userType = uType;
     
      if (this._userType.isAdmin || this._userType.isStudent){
        this.loggedIn = true;
      }      

      this.nav = this._defaultNav.slice(0, this._defaultNav.length);
      if (this._userType.isAdmin) {
        this.nav = this._adminNav.slice(0, this._adminNav.length);;
      }
      else if (this._userType.isStudent) {
        this.nav = this._studentNav.slice(0, this._studentNav.length);
      }
      this.fillUserProfile();

    }, (error) => console.error(error), () => {
      if (this._userType.isAdmin) {
        this.nav = this._adminNav.slice(0, this._adminNav.length);
      }
      else if (this._userType.isStudent) {
        this.nav = this._studentNav.slice(0, this._studentNav.length);
      }
      else {
        this.nav = this._defaultNav.slice(0, this._defaultNav.length);
      }
    });
  }

  public fillUserProfile() {

    if (this._userType.isStudent || this._userType.isAdmin) {
      this.profileaccordion.image_path = "assets/images/anonym-person.png";
    }

    if (this._userType.isStudent) {
      this.profileaccordion.nav_items = [{ name: 'MyAccount', exact: false, link: '/user/account' }, { name: 'MyResults', exact: false, link: '/user/results' }];
    }

    else if (this._userType.isAdmin) {
      this.profileaccordion.nav_items = [{ name: 'MyAccount', exact: false, link: '/user/account' }, { name: 'MyResults', exact: false, link: '/user/results' }];
    }

  }

}
