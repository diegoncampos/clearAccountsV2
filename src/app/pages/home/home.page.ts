import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { UserService } from '../../services/user.service'
import { GroupService } from '../../services/group.service'
import { NavigationExtras, Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public user: any = {userName: "", userEmail: "", groups: []};
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
    this.getUsersGroups();
  }

  getUsersGroups() {
    this.afAuth.authState.subscribe(user =>{
      if (user) {
        this.userService.getUser(user.uid).subscribe((res: any) => {
          this.user.userName = res.payload.data().userName;
          this.groupService.getGroupsByEmail(this.user.userName, this.user.userEmail).subscribe(res => {
            res.docs.forEach(doc => {
              let group = doc.data();
              group.id = doc.id;
              this.user.groups.push(group)
            })
            this.localStorageService.setObject("userInfo", this.user)
          })
        });

        this.user.userEmail = user.email;
      }
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
