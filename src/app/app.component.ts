import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuard } from '../app/guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public userInfo: any = {name: "User", email:"user@email.com"};
  public appPages = [
    {
      title: 'Groups',
      url: '/home',
      icon: 'list'
    },
    {
      title: 'My Debts',
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
