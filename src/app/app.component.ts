import { Component } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoginService } from './http-service-registry/services/login-service.service';
import { Router, NavigationStart } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  public showChat : boolean = false;
  constructor(
    private spinnerService: Ng4LoadingSpinnerService, private login: LoginService,router:Router
  ) {
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        debugger;
          this.showChat = !(event.url.indexOf('main-exam') > -1 || event.url.indexOf('main-exam') > -1);
      }
    });
  }

  closeChat(event){
    this.showChat = false;
  }
  

  ngOnInit() {
    this.spinnerService.show();
    this.login.reloadUser();
  }

  ngAfterViewInit() {
    this.spinnerService.hide();
  }
}
