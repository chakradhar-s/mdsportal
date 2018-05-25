import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  timeString: string;
  // duration = 10*60;
  fduration = 20 * 60;
  fseconds = "";
  fintervalId;
  fminutes = "";
  clockDisplay: string;
  rintervalId = 0;
  message = '';
  rDuration = 20 * 60;
  rSeconds = "";
  rMinutes = "";
  rDisplay: string;
  rCounter: number = 0;
  rclockDisplay: string;

  @Output() endExamEvent = new EventEmitter<boolean>();

  @Input() timerCount: number;

  constructor() { }

  ngOnInit() {

    if (typeof this.timerCount ==='string'&&!isNaN(parseInt(<any>this.timerCount))) {
      this.fduration = parseInt(<any>this.timerCount) * 60;
      this.rDuration = parseInt(<any>this.timerCount) * 60;
      console.log("enyert")
    }
    else if (typeof this.timerCount ==='number') {
      this.fduration = this.timerCount * 60;
      this.rDuration = this.timerCount * 60;
      console.log("juert")
    }
    console.log(this.fminutes + " : " + this.fseconds);
    this.tickTick();
    this.start();
  }
  

  tickTick() {
    if (this.fduration > 0) {
      this.fintervalId = setInterval(() => {
        this.fduration = this.fduration - 1;
        if (this.fduration <= 0) {
          this.clearTimer();
        }

        if (this.fduration % 60 < 10) {
          this.fseconds = "0" + this.fduration % 60;
        } else {
          this.fseconds = (this.fduration % 60).toString();
        }

        if (this.fduration / 60 < 10) {
          this.fminutes = "0" + parseInt("" + this.fduration / 60, 10);
        } else {
          this.fminutes = "" + parseInt((this.fduration / 60).toString(), 10);
        }

        this.clockDisplay = this.fminutes + " : " + this.fseconds;
      }, 1000);
    }
  }

  clearTimer() {
    clearInterval(this.fintervalId);
    clearInterval(this.rintervalId);
  }

  endEmitter() {
    this.endExamEvent.emit(true);
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  start() {
    this.countDown();
  }

  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.fseconds} seconds`;
  }

  private countDown() {
    this.clearTimer();
    this.rintervalId = window.setInterval(() => {
      this.rCounter += 1;
      if (this.rCounter === this.rDuration) {
        this.message = 'Blast off!';
        this.clearTimer();
        this.endEmitter();
      }
      else {
        if (this.rCounter > 60) {
          this.rSeconds = ("0" + (60 - (this.rCounter % 60))).slice(-2);
        }
        else {
          this.rSeconds = ("0" + (60 - this.rCounter)).slice(-2);
        }
        this.rMinutes = ("0" + Math.ceil((this.rDuration - this.rCounter - 60) / 60)).slice(-2);
      }

      this.rDisplay = this.rMinutes + " : " + this.rSeconds;
    }, 1000);
  }
}
