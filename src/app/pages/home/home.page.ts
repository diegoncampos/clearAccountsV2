import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service';
import { NavigationExtras, Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public user: any = {userName: "", userEmail: "", groups: [], userId: ""};
  constructor(
    public afAuth:AngularFireAuth,
    private userService: UserService,
    private groupService: GroupService,
    private router: Router,
    private localStorageService: LocalStorageService
    ) {
  }

  ngOnInit() {
    // this.getUsersGroups();
  }

  ionViewWillEnter() {
    this.user.groups = [];
    this.localStorageService.getObject("userInfo").then(res => {
      if (res) {
        this.user.userEmail = res.userEmail;
        this.getUsersGroups(res.userId);
      }
      else {
        this.getUser();
      }
    });
  }

  getUser() {
    this.afAuth.authState.subscribe(user =>{
      if (user) {
        this.user.userEmail = user.email;
        this.getUsersGroups(user.uid);
      }
    }, error => {
      console.log("ERROR:", error);
    });
  }

  getUsersGroups(userId: string) {
    this.userService.getUser(userId).subscribe((res: any) => {
      this.user.userName = res.userName;
      this.user.userId = userId;
      this.groupService.getGroupsByEmail(this.user.userName, this.user.userEmail).subscribe(res => {
        this.user.groups = res;
        this.localStorageService.setObject("userInfo", this.user)
      })
    });
  }

  goToPurchase(group: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(group)
      }
    };
    this.router.navigate(['purchases'], navigationExtras);
  }

  editGroup(group: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        group: JSON.stringify(group)
      }
    };
    this.router.navigate(['new-group'], navigationExtras);
  }

}
