import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private service: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.service.isLoggedIn()) {
        if(route.url.length > 0) {
          let menu = route.url[0].path;
          if(menu == 'user') {
            if(this.service.getUserRole() == 'admin') {
              return true;
            } else {
              this.toastr.warning('You don\'t have access');
              this.router.navigate(['']);
              return false;
            }
          } else {
            return true;
          }
        } else {
          return true;
        }
      } else {
        this.router.navigate(['login']);
        return false;
      }
  }
}
