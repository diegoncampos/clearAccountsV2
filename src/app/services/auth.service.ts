import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from '../models/user.model'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;
  authState = new BehaviorSubject(false);

  constructor(public afAuth:AngularFireAuth, private router:Router) {
    // afAuth.authState.subscribe(user =>{
    //   this.isLogged = user;
    //   console.log("Loged: ", user)

    //   //when the app is open again or reload (and is still logged) it is redirected to login, some async problem, check later!!
    //   if (user) {
    //     this.router.navigateByUrl('/home');
    //   }
    // });
    this.ifLoggedIn();
  }

  async onLogin(user: User){
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    }
    catch (error){
      console.log("Error on Login: ", error);
    }
  }

  async onRegister(user: User){
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    }
    catch (error){
      console.log("Error on Register: ", error);
    }
  }

  async onLogout() {
    try {
      return await this.afAuth.auth.signOut().then(() => {
        // this.router.navigateByUrl('/login');
      });
    }
    catch (error){
      console.log("Error on Logout: ", error);
    }
  }

  ifLoggedIn() {
    this.afAuth.authState.subscribe(user =>{
      if (user) {
        this.authState.next(true);
        this.isLogged = user;
      }
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
