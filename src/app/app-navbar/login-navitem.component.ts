import { Component, Input, OnDestroy, AfterViewInit } from '@angular/core';

import { Nav } from '../models/nav.interface';
import { LoginService } from '../http-service-registry/services/login-service.service';
import { UserType } from '../models/user.type.interface';
import { ProfileAccordion } from '../models/profile-accordion.interface';

import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

import { Registration } from '../models/registration.interface';

@Component({
  selector: 'app-login-item',
  templateUrl: './login-navitem.component.html'
})
export class LoginNavItem implements OnDestroy, AfterViewInit {
  @Input()
  profileDetails: ProfileAccordion;

  @Input()
  user: Registration;

  public showStyle: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router, private _login: LoginService) {

  }
  ngAfterViewInit() {

    // Detect all clicks on the document
    document.addEventListener("click",
      function (event) {
        this.toggleMenu(event);
      }.bind(this)
    );
  }
  ngOnDestroy() {
    document.removeEventListener("click",
      function (event) {
        this.toggleMenu(event);
      }.bind(this));
  }

  public takeroute(link, event) {
    this.showStyle = !this.showStyle;
    this.router.navigate([link]);
  }

  public logoff() {
    this._login.logoff();
  }

  public toggleMenu(event) {
    let menuContainer = document.querySelector(".dropdown-menu.dropdown-user");
    const dropdownMenu = document.querySelectorAll(".dropdown-toggle");

    // Detect all clicks on the document
    document.addEventListener("click", function (event) {
      // If user clicks inside the element, do nothing
      if ((<Element>event.target).closest(".nav-item.dropdown")) {    
         this.showStyle = !this.showStyle;       
        return;
      }
      // If user clicks outside the element, hide it!
      this.showStyle = false;       
    }.bind(this));


    // const target = (event && event.target) || (event && event.srcElement);

    // if (!this.checkParent(target, [menuContainer])) {
    //   // click NOT on the menu
    //   if (this.checkParent(target, dropdownMenu)) {
    //     // click on the link
    //     if (menuContainer.classList.contains("hide")) {
    //       // Dynamically retrieve Html element (X,Y) position with JavaScript
    //       // http://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
    //       // dropdownMenuDiv.style.left = dropdownMenu.getBoundingClientRect().left + 'px';
    //       menuContainer.classList.remove("hide");
    //       menuContainer.classList.add("show");
    //     } else { menuContainer.classList.add("hide"); }
    //   } else {
    //     // click both outside link and outside menu, hide menu
    //     menuContainer.classList.remove("show");
    //     menuContainer.classList.add("hide");
    //   }
    // }
    // If user clicks inside the element, do nothing
    //if (event.target.closest(".box")) return;

    // If user clicks outside the element, hide it!
    // menuContainer.classList.add("hide");
  }

  public checkParent(t, elm) {
    while (t.parentNode) {
      if (elm)
        elm.forEach(element => {
          if (element == t) { return true; }
        });
      t = t.parentNode;
    }
    return false;
  }

}