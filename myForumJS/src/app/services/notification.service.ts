import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notification = new Subject<string>();
  notification$ = this._notification.asObservable();

  notify(message: string) {
    this._notification.next(message);
  }
 
}
