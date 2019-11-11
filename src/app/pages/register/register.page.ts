import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = new User();

  constructor(
    private authService:AuthService,
    private router:Router,
    private userService: UserService
    ) { }

  ngOnInit() {
  }

  async onRegister(){
    const user = await this.authService.onRegister(this.user);

    if(user){
      console.log("Register succesfully!");
      this.userService.newUser(user.user.uid, {"userEmail": this.user.email, "userName": this.user.name, "groups":[]});
      this.router.navigateByUrl('/home');
    }
  }

}
