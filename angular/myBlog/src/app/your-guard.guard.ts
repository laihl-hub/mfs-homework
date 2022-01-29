import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class YourGuardGuard implements CanActivate {
  constructor(private userService:UsersService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userId=window.localStorage.getItem('userId')
      if(!userId){
        window.alert('请先登录噢~')
      }
    return !!userId
  }
  
}
