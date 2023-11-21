import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notificationService: NzNotificationService) {}

  public showSuccess(message: string, description?: string) {
    this.notificationService.success(message ?? '', description ?? '');
  }
  public showError(message: string, description?: string) {
    this.notificationService.error(message ?? '', description ?? '');
  }
  public showInfo(message: string, description?: string) {
    this.notificationService.info(message ?? '', description ?? '');
  }
}
