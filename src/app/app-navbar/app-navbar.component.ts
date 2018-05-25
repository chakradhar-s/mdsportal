import { Component, OnInit } from '@angular/core';
import { Nav } from '../models/nav.interface';
import { LoginService } from '../http-service-registry/services/login-service.service';
import { SignUpService } from '../http-service-registry/services/signup.service';
import { UserType } from '../models/user.type.interface';
import { ProfileAccordion } from '../models/profile-accordion.interface';

import { Registration } from '../models/registration.interface';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {

  public nav: Nav[];
  public loggedIn: boolean;
  public profileaccordion: ProfileAccordion;
  public isLoginPage: boolean = false;
  public userName: Registration;

  private readonly _defaultNav: Nav[];
  private readonly _studentNav: Nav[];
  private readonly _adminNav: Nav[];

  private _userType: UserType;
  constructor(private _login: LoginService, private signup: SignUpService) {
    this._defaultNav = [{ exact: true, link: '/home', name: 'HOME' },
    { exact: true, link: '/about', name: 'ABOUT US' },
    // { exact: true, link: '/analysis', name: 'Analysis' },
    { exact: true, link: '/payment', name: 'PAYMENT  |  SCHEDULE & PP BOOKS' },
    { exact: true, link: '/feedback', name: 'Results' },
    { exact: true, link: '/s-strategy', name: 'DEV' },
    { exact: true, link: '/demo-exam/4c9c71ef-1103-4692-bcca-901ff03efcab', name: 'DEMO EXAM' },
    { exact: true, link: '/contactus', name: 'CONTACT US' },
    { exact: true, link: '/login', name: 'Login' }
    ];

    this._studentNav = [{ exact: true, link: '/home', name: 'HOME' },
    { exact: true, link: '/payment', name: 'PAYMENT  |  SCHEDULE & PP BOOKS' },
    { exact: true, link: '/feedback', name: 'Results' },    
    { exact: true, link: '/s-strategy', name: 'DEV' },
    { exact: true, link: '/demo-exam/4c9c71ef-1103-4692-bcca-901ff03efcab', name: 'DEMO EXAM' },
    { exact: true, link: '/contactus', name: 'CONTACT US' }];

    this._adminNav = [{ exact: true, link: '/home', name: 'HOME' },
    { exact: true, link: '/about', name: 'ABOUT US' },
    { exact: true, link: '/payment', name: 'PAYMENT  |  SCHEDULE & PP BOOKS' },
    { exact: true, link: '/feedback', name: 'Results' },    
    { exact: true, link: '/s-strategy', name: 'DEV' },
    { exact: true, link: '/demo-exam/4c9c71ef-1103-4692-bcca-901ff03efcab', name: 'DEMO EXAM' },
    { exact: true, link: '/contactus', name: 'CONTACT US' }];

    this.profileaccordion = { image_default: true, image_path: "", nav_items: [{ link: '', exact: false, name: '' }] };
  }

  ngOnInit() {

    this._login.pageRedirectedToLogin.subscribe((loginPage) => {
      this.isLoginPage = loginPage;
    });

    this._login.userType.subscribe((uType) => {
      this._userType = uType;

      this.loggedIn = this._userType.isAdmin || this._userType.isStudent;
      this.nav = this._defaultNav.slice(0, this._defaultNav.length);

      if (this.loggedIn) {

        if (this._userType.isAdmin) {
          this.nav = this._adminNav.slice(0, this._adminNav.length);;
        }
        else if (this._userType.isStudent) {
          this.nav = this._studentNav.slice(0, this._studentNav.length);
        }
        this.fillUserProfile();
        this.userName = this._login.userProfile.user;
      }
      else if (!this.loggedIn) {
        this.nav = this._defaultNav.slice(0, this._defaultNav.length);
        this.unfillUserProfile();
      }

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
    if (this.loggedIn) {
      this.profileaccordion.image_path = "assets/images/anonym-person.png";
      this.signup.getUserPic(this._login.userProfile.user.userId).subscribe((re) => {
        this.profileaccordion.image_path = re.imageUrl;
      });
    }

    if (this._userType.isStudent && this._login.userProfile.user && this._login.userProfile.user.userId) {
      this.profileaccordion.nav_items = [
        { exact: true, link: '/taketest', name: 'Take a Exam' },
        { name: 'MyResults', exact: false, link: `/view-results/${this._login.userProfile.user.userId}` },
        { name: 'Analysis', exact: true, link: '/analysis' },
      ];
    }

    else if (this._userType.isAdmin && this._login.userProfile.user && this._login.userProfile.user.userId) {
      this.profileaccordion.nav_items = [
        { exact: true, link: '/taketest', name: 'Take a Exam' },

        { name: 'MyResults', exact: false, link: `/view-results/${this._login.userProfile.user.userId}` },
        { name: 'Analysis', exact: true, link: '/analysis' },
        { name: 'Rank Reports', exact: true, link: '/downloadranks' },
        { name: 'Manage users', exact: false, link: `/user-management` },
        { name: 'Upload a question paper', exact: false, link: '/question-upload' },
        { name: 'Upload questions images', exact: false, link: '/upload-questions-image' }];
    }

  }

  public unfillUserProfile() {
    this.profileaccordion = { image_default: true, image_path: "", nav_items: [{ link: '', exact: false, name: '' }] };
  }

  public toggleTop(event) {

    const parent = this.getClosest(event.currentTarget, "html");
    if (event.currentTarget.classList.contains("toggled")) {
      event.currentTarget.classList.remove("toggled");
      parent.classList.remove("topbar_open");
    }
    else {
      event.currentTarget.classList.add("toggled");
      parent.classList.add("topbar_open");
    }

  }

  private getClosest(elem, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype['matchesSelector'] ||
        Element.prototype['mozMatchesSelector'] ||
        Element.prototype.msMatchesSelector ||
        Element.prototype['oMatchesSelector'] ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) { }
          return i > -1;
        };
    }

    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;

  };

}
