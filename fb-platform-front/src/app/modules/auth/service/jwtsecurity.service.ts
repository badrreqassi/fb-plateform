import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
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

  authenticate(username: string, password: string) {
      this.http.post<any>("http://localhost:8080/api/auth/token", {username, password}).subscribe(response => {
      localStorage.setItem("token", response?.token);
      localStorage.setItem("roles", response?.roles);
      localStorage.setItem("username", response?.username);
      localStorage.setItem("userId", response?.userId);
       this.messageService.add({
         severity: 'success',
         summary: 'Authenticated Successfully'
       })
      const admin = (response.roles as string[]).find(role => role === 'ADMIN');
      if (admin) {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['client']);
      }
    }, () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed to authenticate'
      })
    })
  }

}
