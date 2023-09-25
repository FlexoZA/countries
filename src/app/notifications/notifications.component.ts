import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notificationVisible: boolean = false;
  message: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.registerCallback((message) => {
      this.message = message;
      this.notificationVisible = true;
      this.notification();
      console.log('It reaches here');
    });
  }

  notification() {
    setTimeout(() => {
      console.log('DEBUG:: Notification time out');
      this.message = null;
      this.notificationVisible = false;
    }, 3000);
  }
}
