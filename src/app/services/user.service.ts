import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollectionRef: any = null;
  currentUserId: string = null;

  constructor(private authService:AuthService, private afs: AngularFirestore) {
    // this.user = this.authService.isLogged ? this.authService.isLogged : null;
    // this.usersCollectionRef= this.afs.collection('users');
  }

  newUser(id: string, user: any){
    // this.currentUserId = id;
    return this.afs.collection('users').doc(id).set(user);
  }

  getUser(id) {
    return this.afs.collection('users').doc(id).snapshotChanges();
  }


}
