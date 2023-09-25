import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private callback: ((message: string) => void) | null = null;

  displayNotification(message: string) {
    if (this.callback) {
      this.callback(message);
    }
  }

  registerCallback(callback: (message: string) => void) {
    this.callback = callback;
  }
}
