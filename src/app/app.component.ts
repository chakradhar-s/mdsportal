import { Component } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(
    private spinnerService: Ng4LoadingSpinnerService
) { 

}

ngOnInit() {
  this.spinnerService.show();
}

ngAfterViewInit() {
  this.spinnerService.hide();
}
}
