import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: { message: string; id: number }[] = [];
  nextId = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.registerCallback((message) => {
      const id = this.nextId++;
      this.notifications.push({ message, id });
      this.notification(id);
    });
  }

  notification(id: number) {
    setTimeout(() => {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== id
      );
    }, 3000);
  }
  closeNotification() {
    this.notifications = [];
  }
}
