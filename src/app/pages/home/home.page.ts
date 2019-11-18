import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { UserService } from '../../services/user.service'
import { GroupService } from '../../services/group.service'

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
    private groupService: GroupService
    ) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user =>{
      if (user) {
        this.userService.getUser(user.uid).subscribe((res: any) => {
          this.user.userName = res.payload.data().userName;
          // console.log("User Data: ", res.payload.data().userName)
          this.groupService.getGroupsByEmail(this.user.userName, this.user.userEmail).subscribe(res => {
            res.docs.forEach(doc => {
              console.log("Aca:", doc.data())
              this.user.groups.push(doc.data())
            })
          })
        });

        this.user.userEmail = user.email;
        console.log("EMAIL", this.user.userEmail )

        // this.groupService.getGroupsByEmail(this.user.userName, this.user.userEmail).subscribe(res => {
        //   res.docs.forEach(doc => {
        //     console.log("Aca:", doc.data())
        //     this.user.groups.push(doc.data())
        //   })
        // })
      }
    });
  }

}
