import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model'
import { ToastController } from '@ionic/angular';

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
    public toastController: ToastController,
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
      this.presentToast("Wrong password or email");
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
