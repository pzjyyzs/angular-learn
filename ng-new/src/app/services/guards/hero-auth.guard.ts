import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators';
import { Hero } from 'src/app/heroes/home/add-hero/types';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class HeroAuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router){

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const auths = next.data.auths;
    return this.userService.user$.pipe(
      switchMap(user => {
        if (user) {
          if (auths.includes(user.role)) {
            return of(true);
          } else {
            return of(false);
          }
        }
        this.router.navigateByUrl('/login').then(() => {
          alert('请先登录');
        });
        return of(false);
      })
    );
  }

}
