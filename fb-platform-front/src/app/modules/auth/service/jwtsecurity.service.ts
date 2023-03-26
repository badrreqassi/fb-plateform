import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class JWTsecurityService {

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private router: Router) {
  }

  authenticate(username: string, password: string): Observable<any> {
    return this.http.post<any>("http://localhost:8080/api/auth/token", {username, password}).pipe(
      map(response => {
        {
          if (response) {
            localStorage.setItem("token", response?.token);
            localStorage.setItem("roles", response?.roles);
            localStorage.setItem("username", response?.username);
            localStorage.setItem("userId", response?.userId);
            localStorage.setItem("logo", response?.firstName.charAt(0) + response?.lastName.charAt(0))

           /* const admin = (response.roles as string[]).find(role => role === 'ADMIN');
            if (admin) {
              this.router.navigate(['client']);
            } else {
              this.router.navigate(['client']);
            }*/
            this.router.navigate(['client']);
            return 'Authenticated Successfully'
          } else {
            return 'Failed to authenticate';
          }
        }
      })
    );
  }

}
