import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'circle-draw',
  inputs: [
    "percent",
    "color",
    "backgroundColor"
  ],
  templateUrl: './circle-draw.component.html',
  styleUrls: ['./circle-draw.component.scss']
})
export class CircleDrawComponent implements OnInit {

  public backgroundColor: string;
  public color: string;
  public dashArray: string;
  public percent: number;
  constructor() {

    this.backgroundColor = "#CCD6DD";
    this.color = "currentColor"; // Will inherit the current color context.
    this.dashArray = "0,100";
    this.percent = 0;
  }

  ngOnInit() {
    if (isNaN(this.percent) || (this.percent < 0)) {

      this.percent = 0;

    } else if (this.percent > 100) {

      this.percent = 100;

    }

    // Normalize the background color.
    if (this.backgroundColor === "none") {

      this.backgroundColor = "";

    }

    // The progress indicator is implemented as the first dash in a dashed-path stroke
    // of the circle SVG. In order to translate the percent-input into a dash length,
    // we have to determine the circumference of the circle. Then, the length of the
    // completed portion is simply the percentage translation of the circumference.
    var radius = 15;
    var totalLength = (Math.PI * 2 * radius);
    var pathLength = (totalLength * this.percent / 100);

    this.dashArray = `${pathLength},100`;
  }

}
