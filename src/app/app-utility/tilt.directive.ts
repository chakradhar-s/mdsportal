import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[data-tilt]'
})
export class TiltDirective {

  constructor(private el: ElementRef) { 
    //as VanillaTilt is a static class
    window['VanillaTilt'].init(el.nativeElement, {
      max: 25,
      speed: 400
    });
  }

}
