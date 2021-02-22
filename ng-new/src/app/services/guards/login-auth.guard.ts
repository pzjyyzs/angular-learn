import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hero } from 'src/app/heroes/home/add-hero/types';
import { UserService } from './../user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router){

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.userService.user$.pipe(
                switchMap(user => {
                  if (user) {
                    this.router.navigateByUrl('/home/heroes');
                    return of(false);
                  }
                  return of(true);
      }));
  }

}
