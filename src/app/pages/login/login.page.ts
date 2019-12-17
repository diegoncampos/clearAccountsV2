import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model'
import { ToastController } from '@ionic/angular';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();

  constructor(
    private authService:AuthService,
    private router:Router,
    private notificationsService: NotificationsService
    ) { }

  ngOnInit() {
  }

  async onLogin(){
    const user = await this.authService.onLogin(this.user);
    if (user){
      console.log("Login succesfuly!");
      this.router.navigateByUrl('/home');
    }
    else {
      this.notificationsService.showMessage("Wrong password or email");
    }
  }

}
