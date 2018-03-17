import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarRoutingModule } from './side-bar-routing.module';
import { SideBarComponent } from './side-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SideBarRoutingModule,
    NgbModule
  ],
  declarations: [SideBarComponent],
  exports: [SideBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SideBarModule { }
