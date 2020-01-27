import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuard } from '../app/guards/auth.guard';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';
const { PushNotifications, Modals } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public userInfo: any = {name: "User", email:"user@email.com"};
  public appPages = [
    {
      title: 'Groups',
      url: '/home',
      icon: 'list'
    },
    {
      title: 'Pay My Debts',
      url: '/debts',
      icon: 'sad'
    },
    {
      title: 'Profile',
      url: '/home',
      icon: 'person'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService:AuthService,
    private router:Router,
    private userService: UserService,
    private alertController: AlertController,
    private authGuard: AuthGuard
  ) {
    this.initializeApp();
    this.userService.observableUserInfo.subscribe((info: any) => {
      if(info){
        this.userInfo = {name: info.userName, email: info.userEmail};
      }
    });
    this.backButtonAction();
  }

  ngOnInit() {
    // this.getUsersGroups();
    console.log('Initializing HomePage');

    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);
        console.log('Push registration success, token: ' + token.value)
        // this.token = token.value;
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
        // this.token = JSON.stringify(error);
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        // alert('Push received: ' + JSON.stringify(notification));
        var notificationAudio = new Audio('assets/open-up.mp3');
        notificationAudio.play();
        let alertMod = Modals.alert({title: notification.title, message: notification.body});
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  backButtonAction() {
    this.platform.backButton.subscribe(async () => {
      if ((this.router.isActive('/home', true) && this.router.url === '/home') || (this.router.isActive('/login', true) && this.router.url === '/login')) {
        const alert = await this.alertController.create({
          header: 'Close app?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            }, {
              text: 'Close',
              handler: () => {
                navigator['app'].exitApp();
              }
            }
          ]
        });
        await alert.present();
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }

  onLogOut() {
    this.authService.onLogout().then(resp => {
      console.log("Logout succesfully!");
      this.authGuard.logOut();
      this.router.navigateByUrl('/login');
    });
  }
}
