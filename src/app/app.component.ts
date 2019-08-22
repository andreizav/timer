import { Component, HostListener } from '@angular/core';
import { Subscription, interval, fromEvent, empty } from 'rxjs';
import { mapTo, scan, switchMap, map } from 'rxjs/operators';
import { Time } from './models/time.model';
import { ClockSettings } from './models/clockSettings.Interface'

@Component({
  selector: 'my-app',
  template: `
  <div class="wrapper">
    <main>
      <div class="main_clock">
        <clock [time]="time" [settings]="mainClockSettings"></clock>
      </div>
      <nav>
        <button id="playBtn">
          <i [ngClass]="{'fa-pause':runningStatus, 'fa-play':!runningStatus}" class="fa"></i>
          <span [innerHTML]="runningStatus?'Pause':'Play'"></span>
        </button>
        <button (click)="save()"><i class="fa fa-clock-o"></i></button>
        <button (click)="stopTimer()"><i class="fa fa-trash-o"></i></button>
      </nav>
      <list-item [listTime]="listTime" (remove)="removeFromList($event)"></list-item>
    </main>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  time: Time;
  listTime: Time[] = [];
  runningStatus: boolean = false;
  private subscription: Subscription;

  mainClockSettings: ClockSettings = {
    timeColor: "#80d92f",
    placeholderColor: "#334522"
  };

  @HostListener('window:beforeunload')
  saveToLocal() {
    window.localStorage.setItem("timeData", JSON.stringify({
      current: this.time,
      list: this.listTime.map((time: Time) => time.totalSec)
    }));
  }

  constructor() { }

  ngOnInit() {
    const storageData = JSON.parse(window.localStorage.getItem("timeData"));
    if (storageData) {
      this.time = storageData.current;
      this.listTime = storageData.list.map((totalSec: number) => this.secToTime(totalSec, new Time()));

      // needed if want count ticks after browser is closed
      // this.startTimer(Math.round((new Date().getTime() - storageData.current.currentTime) / 1000));

      this.startTimer(storageData.current.totalSec);
    } else {
      this.time = new Time();
      this.startTimer(0);
    }
  }

  startTimer(startTimerFrom: number): void {
    const interval$ = interval(1000).pipe(mapTo(1));
    this.subscription = fromEvent(document.getElementById('playBtn'), 'click')
      .pipe(
        map(() => this.runningStatus = !this.runningStatus),
        switchMap(val => (val ? interval$ : empty())),
        scan((res: number, step: number) => res + step, startTimerFrom)
      ).subscribe((sec: number) => this.secToTime(sec, this.time));

    // needed if want start count automaticly after browser reopened
    // if(startTimerFrom) document.getElementById('playBtn').click()
  }

  stopTimer(): void {
    this.listTime = [];
    this.time = new Time();
    this.subscription.unsubscribe();
    this.runningStatus = false;
    this.startTimer(0);
  }

  secToTime(sec: number, time: Time): Time {
    let hours = Math.floor(sec / 3600).toString();
    let minutes = Math.floor((sec - (+hours * 3600)) / 60).toString();
    let seconds = (sec - (+hours * 3600) - (+minutes * 60)).toString();

    if (+hours < 10) { hours = "0" + hours; }
    if (+minutes < 10) { minutes = "0" + minutes; }
    if (+seconds < 10) { seconds = "0" + seconds; }

    time.totalSec = sec;
    time.sec = seconds;
    time.minute = minutes;
    time.hour = hours;

    return time;
  }

  save(): void {
    this.listTime.unshift({ ...this.time });
  }

  removeFromList(time: Time): void {
    this.listTime.splice(this.listTime.indexOf(time), 1);
  }
}

