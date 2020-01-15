import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable()
export class NotifyService {
  duration = 4000;
  snackBarRef: any;
  constructor(public snackBar: MatSnackBar) {
  }

  open(message: string, action?: string): void {
    this.snackBarRef = this.snackBar.open(message, action, { duration: this.duration });
  }

  setDuration(duration: number) {
    this.duration = duration;
  }

  onDismiss(): Observable<void>{
    return this.snackBarRef.afterDismissed();
  }
}


