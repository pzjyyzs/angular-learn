import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AddHeroComponent } from 'src/app/heroes/home/add-hero/add-hero.component';

@Injectable({
  providedIn: 'root'
})
export class HeroCanDeactivateGuard implements CanDeactivate<AddHeroComponent> {
  canDeactivate(component: AddHeroComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canDeactivate();
  }

}
