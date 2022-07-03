import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../Services/auth.service";
// import { getAuth } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const auth = getAuth();
    // const currentLoggedInUser = auth.currentUser;
    // if (currentLoggedInUser) {
    //   return true;
    // }
    console.log(state.url && localStorage.getItem('AUTH_FMV'));
    if (state.url === '/sign-in') {
      return false;
    }
    if(localStorage.getItem('AUTH_FMV')){
      return true
    }
    this.router.navigate(['/sign-in']);
    return false;
  }

}
