import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';
import { LocalStorageService } from './local-storage.service';
const { PushNotifications, Modals } = Plugins;
import { Platform } from '@ionic/angular';
import { DeviceService } from '../services/device.service';
import { NotificationsService } from '../services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class FcmNotificationService {

  private userInfo: any;

  constructor(
    private localStorageService: LocalStorageService,
    private platform: Platform,
    private deviceService: DeviceService,
    private notificationsService: NotificationsService
  ) { }

  initializefcm() {
    console.log('Initializing HomePage');
    this.localStorageService.getItem("userInfo").then(res => {
      this.userInfo = res;
    })

    // This if is not working, seems like a ionic issue
    if (this.platform.is('android')) {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token: PushNotificationToken) => {
          // alert('Push registration success, token: ' + token.value);
          // console.log('Push registration success, token: ' + token.value)
          // this.token = token.value;
          this.verifyDeviceExist(token.value);
        }
      );

      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error: any) => {
          this.notificationsService.showMessage('Error on registration: ' + JSON.stringify(error));
          // this.token = JSON.stringify(error);
        }
      );

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotification) => {
          // alert('Push received: ' + JSON.stringify(notification));
          var notificationAudio = new Audio('assets/open-up.mp3');
          notificationAudio.play();
          let alertMod = Modals.alert({ title: notification.title, message: notification.body });
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: PushNotificationActionPerformed) => {
          this.notificationsService.showMessage('Push action performed: ' + JSON.stringify(notification));
        }
      );
    }


  }

  verifyDeviceExist(token: string){
    this.deviceService.getDeviceByToken(token).subscribe(res => {
      if(res.length === 0) {
        this.deviceService.newDevice({userId: this.userInfo.userId, token: token}).then(res => {
          console.log("New Device Saved");
          this.notificationsService.showMessage("New Device Saved");
        }, err => {
          console.log("Error Saving Device");
          this.notificationsService.showMessage("Error Saving Device")
         });
      }
    })
  }
}
