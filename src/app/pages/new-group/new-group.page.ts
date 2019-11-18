import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { GroupService } from '../../services/group.service'
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.page.html',
  styleUrls: ['./new-group.page.scss'],
})
export class NewGroupPage implements OnInit {

  public friends: any = [];
  public email: string = "";
  public groupName: string = "";
  constructor(
    private router: Router,
    private userService: UserService,
    public toastController: ToastController,
    public groupService: GroupService,
    public afAuth:AngularFireAuth
    ) { }

  ngOnInit() {
    let myUser: any = [];
    this.afAuth.authState.subscribe(user =>{
      if (user) {
        this.userService.getUser(user.uid).subscribe((res: any) => {
          myUser.userName = res.payload.data().userName;
          myUser.userEmail = user.email;
          this.friends.push({ email: myUser.userEmail, name:  myUser.userName});
        });
      }
    });
  }

  addFriend(email) {
    if (email != "") {

      this.userService.getUserByEmail(email).subscribe(snap => {
        if (snap.length === 0) {
            console.log('user does not exist');
            this.presentToast("User does not exist");
        } else {
          console.log('User logged in', snap[0].payload.doc.data());
          this.friends.push({ email: email, name:  snap[0].payload.doc.data().userName});
          this.email = "";
        }
    });
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  deleteFriend(index) {
    this.friends.splice(index, 1);
  }

  save(){
    this.groupService.newGoup({name: this.groupName, participants: this.friends}).then(res => {console.log("Group saved!", res)}, err => {console.log("Fail saving group")});
    this.router.navigate(['/home']);
  }

}
