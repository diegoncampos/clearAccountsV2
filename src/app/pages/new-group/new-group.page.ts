import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service'
import { GroupService } from '../../services/group.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { NotificationsService } from '../../services/notifications.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.page.html',
  styleUrls: ['./new-group.page.scss'],
})
export class NewGroupPage implements OnInit {

  public friends: any = [];
  public email: string = "";
  public groupName: string = "";
  public title: string = "New Group";
  public editGroup: any = null;
  constructor(
    private router: Router,
    private userService: UserService,
    public groupService: GroupService,
    public afAuth:AngularFireAuth,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
    ) {
      this.route.queryParams.subscribe(params => {
        if (params && params.group) {
          this.editGroup = JSON.parse(params.group);
          this.title = "Edit Group '" + this.editGroup.name + "'";
          this.groupName = this.editGroup.name;
          this.friends = this.editGroup.participants;
        }
      });
    }

  ngOnInit() {
    if (!this.editGroup) {
      this.addSelfUser();
    }
  }

  addSelfUser() {
    let myUser: any = [];
    this.localStorageService.getObject("userInfo").then(res => {
      if (res) {
        myUser.userName = res.userName;
        myUser.userEmail = res.userEmail;
        this.friends.push({ email: myUser.userEmail, name: myUser.userName });
      }
    })
  }

  // Save true will save group if you added just one valid friend
  addFriend(email, save?) {
    if (email != "") {
      this.userService.getUserByEmail(email).subscribe((res: any) => {
        if (res.length === 0) {
          console.log('user does not exist');
          this.notificationsService.showMessage("User does not exist");
        } else {
          this.friends.push({ email: email, name: res[0].userName });
          this.email = "";
          if(save) {
            this.save();
          }
        }
      });
    }
  }

  deleteFriend(index) {
    this.friends.splice(index, 1);
  }

  /**If you add just one friend, check if exist, add to list and save. If you don't have
   * any friends in the list and the friend email label is empty show a notification.
   * To save a group you should have at least one friend added
   */
  savePressed() {
    if (this.friends.length <= 1) {
      if (this.email !== "") {
        this.addFriend(this.email, true);
      }
      else {
        this.notificationsService.showMessage("You need add some friends to the group!");
      }
    }
    else {
      this.save();
    }
  }

  save() {
    if (this.editGroup) {
      this.groupService.editGoup(this.editGroup.groupId, { name: this.groupName, participants: this.friends }).then(res => {
        this.notificationsService.showMessage("Group Updated!")
      }, err => { this.notificationsService.showMessage("Fail updating group") });
      this.router.navigate(['/home']);
    }
    else {
      this.groupService.newGoup({ name: this.groupName, participants: this.friends }).then(res => {
        this.notificationsService.showMessage("Group saved!")
      }, err => { this.notificationsService.showMessage("Fail saving group") });
      this.router.navigate(['/home']);
    }
  }

}
