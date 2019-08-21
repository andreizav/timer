export class Time {
    hour: string = '00';
    minute: string = '00';
    sec: string = '00';
    totalSec: number = 0;
    currentTime?: number = new Date().getTime(); // needed if want count ticks after browser is closed
  
    constructor(time?) {
      if(time) {
        this.hour = time.hour;
        this.minute = time.minute;
        this.sec = time.sec
        this.totalSec = time.totalSec;
        this.currentTime = time.currentTime ;
      }
    }
  }