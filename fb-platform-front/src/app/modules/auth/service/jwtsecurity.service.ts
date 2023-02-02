import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JWTsecurityService {

  constructor( private http :HttpClient) { }
  authenticate(email : string, password: string):Observable<any> {
    return this.http
      .post<any>("http://localhost:8080/login", { email, password })
      .pipe(
        map(data => {
          localStorage.setItem("token", data?.token);
          return data;
        })
      );
  }

}
