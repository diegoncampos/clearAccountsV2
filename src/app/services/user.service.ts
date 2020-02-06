import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollectionRef: any = null;
  currentUserId: string = null;
  public userInfo: string;
  public observableUserInfo: BehaviorSubject<any>;

  constructor(private authService:AuthService, private afs: AngularFirestore) {
    // this.user = this.authService.isLogged ? this.authService.isLogged : null;
    // this.usersCollectionRef= this.afs.collection('users');
    this.observableUserInfo = new BehaviorSubject<any>(this.userInfo);
  }

  newUser(id: string, user: any){
    // this.currentUserId = id;
    return this.afs.collection('users').doc(id).set(user);
  }

  getUser(id) {
    let user = this.afs.collection('users').doc(id).valueChanges();
    user.subscribe((userInfo: any) => {
      this.userInfo = userInfo;
      this.observableUserInfo.next(this.userInfo);
    });
    return user;
  }

  getUserByEmail(email: string) {
    const usersCollection = this.afs.collection<any>('users', ref => ref.where('userEmail', '==', email));
    return usersCollection.valueChanges({idField: 'userId'});
  }


}
