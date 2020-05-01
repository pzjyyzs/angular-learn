import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/internal/operators';
import { MemberService } from 'src/app/service/member.service';
import { User, recordVal, UserSheet } from 'src/app/service/data-types/member.types';

type CenterDataType = [User, recordVal[], UserSheet];

@Injectable({
  providedIn: 'root'
})
export class CenterResolverService implements Resolve<CenterDataType> {
  constructor(
    private memberServe: MemberService,
    private router: Router
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<CenterDataType> {
    const uid = route.paramMap.get('id');
    if (uid) {
      return forkJoin([
        this.memberServe.getUserDetail(uid),
        this.memberServe.getUserRecord(uid),
        this.memberServe.getUserSheets(uid)
      ]).pipe(first());
    } else {
      this.router.navigate(['/home']);
    }

  }
}
