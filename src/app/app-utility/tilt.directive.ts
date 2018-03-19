import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[data-tilt]'
})
export class TiltDirective {

  constructor(private el: ElementRef) {
    //as VanillaTilt is a static class
    window['VanillaTilt'].init(el.nativeElement, {
      "max": 40,
      "speed": 2000,
      "max-glare": 0.25,
      "perspective": 3000,
      "glare":true 
    });
  }

}
