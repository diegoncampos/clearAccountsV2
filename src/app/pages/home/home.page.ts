import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public user: any = {"userName": "user"};
  constructor(public afAuth:AngularFireAuth, private userService: UserService) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user =>{
      if (user) {
        this.userService.getUser(user.uid).subscribe((res) => {
          this.user = res.payload.data();
          console.log("User Data: ", res.payload.data())
        });
      }
    });
  }

}
