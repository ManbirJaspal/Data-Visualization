import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SessionTimeoutService {
   idleTime: number = 20 * 60 * 1000;

  constructor() { }

  timeout() {

    let timeout: any;
    return new Observable(observer => {

      const setInactive = () => {
        clearTimeout(timeout);
        document.removeEventListener("mousemove", resetTimer);
        document.removeEventListener("mousedown", resetTimer);
        document.removeEventListener("keydown", resetTimer);
        document.removeEventListener("scroll", resetTimer);
        document.removeEventListener("touchstart", resetTimer);
        document.removeEventListener("touchmove", resetTimer);

        observer.next(true);
      };

      const resetTimer = () => {
        if(!!timeout){
          clearTimeout(timeout);
        }
        timeout = setTimeout(setInactive, this.idleTime);
      };

      // events - note: not tested for accessibility
      //window.onload = resetTimer;
      resetTimer();

      document.addEventListener("mousemove", resetTimer);
      document.addEventListener("mousedown", resetTimer);
      document.addEventListener("keydown", resetTimer);
      document.addEventListener("scroll", resetTimer);
      document.addEventListener("touchstart", resetTimer);
      document.addEventListener("touchmove", resetTimer);
    });
  }

  setTime(idleTime: number) {
    console.log(`setting idle time for session timeout ${idleTime/1000} seconds`);
    this.idleTime = idleTime;
  }
}
