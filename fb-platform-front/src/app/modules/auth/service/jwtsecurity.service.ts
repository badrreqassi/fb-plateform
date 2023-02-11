import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class JWTsecurityService {

  constructor( private http :HttpClient,
               private router: Router) { }
  authenticate(username : string, password: string):Observable<any> {
    return this.http
      .post<any>("http://localhost:8080/api/auth/token", { username, password })
      .pipe(
        map(data => {
          localStorage.setItem("token", data?.token);
          localStorage.setItem("roles", data?.roles);
          localStorage.setItem("username", data?.username);
          const admin = (data.roles as string[]).find(role => role === 'ADMIN');
          console.log('is admin', admin);
          if (admin) {
            this.router.navigate(['admin']);
          }else {
            this.router.navigate(['client']);
          }
        })
      );
  }

}
