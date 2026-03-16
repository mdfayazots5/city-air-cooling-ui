import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  dismissible?: boolean;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notifications.asObservable();

  private defaultDuration = 5000;

  constructor() {}

  success(title: string, message: string, duration: number = this.defaultDuration): void {
    this.addNotification({
      type: 'success',
      title,
      message,
      duration,
      dismissible: true
    });
  }

  error(title: string, message: string, duration: number = this.defaultDuration * 2): void {
    this.addNotification({
      type: 'error',
      title,
      message,
      duration,
      dismissible: true
    });
  }

  warning(title: string, message: string, duration: number = this.defaultDuration): void {
    this.addNotification({
      type: 'warning',
      title,
      message,
      duration,
      dismissible: true
    });
  }

  info(title: string, message: string, duration: number = this.defaultDuration): void {
    this.addNotification({
      type: 'info',
      title,
      message,
      duration,
      dismissible: true
    });
  }

  private addNotification(notification: Omit<Notification, 'id' | 'timestamp'>): void {
    const newNotification: Notification = {
      ...notification,
      id: this.generateId(),
      timestamp: new Date()
    };

    const currentNotifications = this.notifications.value;
    this.notifications.next([...currentNotifications, newNotification]);

    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.dismiss(newNotification.id);
      }, notification.duration);
    }
  }

  dismiss(id: string): void {
    const currentNotifications = this.notifications.value;
    this.notifications.next(currentNotifications.filter(n => n.id !== id));
  }

  clear(): void {
    this.notifications.next([]);
  }

  private generateId(): string {
    return 'notif_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  getNotifications(): Notification[] {
    return this.notifications.value;
  }
}

