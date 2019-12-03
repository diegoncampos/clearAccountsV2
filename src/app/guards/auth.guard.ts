import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private loggedIn: boolean = false;
  constructor(private authService:AuthService, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isLogged) {
        this.loggedIn = this.authService.isLogged;
        return true;
      }
      console.log("Access denied!")
      this.router.navigateByUrl('/login');
      return false;
  }

  public getGuardAuthentication(): boolean {
    return this.loggedIn;
  }

  logOut() {
    this.loggedIn = false;
  }

}
