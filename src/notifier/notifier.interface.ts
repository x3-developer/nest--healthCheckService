export enum NotificationTypeEnum {
  ALERT = 'alert',
  CALM = 'calm',
}

export interface INotifier {
  sendNotification: (
    site: string,
    notificationType: NotificationTypeEnum,
  ) => Promise<void>;
}
