import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Base, LoginArg, LoginType } from './../heroes/home/add-hero/types';
import { stringify } from 'qs';
import { catchError, map } from 'rxjs/internal/operators';
import { AuthKey } from './../configs/contsant';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private prefix = environment.baseUrl + '/hero/';
  constructor(private http: HttpClient) { }

  login(args: LoginArg): Observable<LoginType> {
    return this.http.post(this.prefix + 'login', { ...args })
    .pipe(
      map((res: Base<LoginType>) => res.data)
    );
  }

  account(auth: string): Observable<LoginType> {
    return this.http.get(this.prefix + 'account')
    .pipe(
      map((res: Base<LoginType>) => res.data)
    );
  }
}
