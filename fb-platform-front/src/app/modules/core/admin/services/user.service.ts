import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../../models/User";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsersList() : Observable<User[]>{
    return this.http.get<User[]>(`${environment.server.mainApiUrl}/api/users`);
  }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${environment.server.mainApiUrl}/api/user`,user);
  }

  updateUser(id: number, user: User): Observable<User>{
    return this.http.put<User>(`${environment.server.mainApiUrl}/api/user/${id}`,user);
  }

  deleteUser(id: number): Observable<string>{
    return this.http.delete<string>(`${environment.server.mainApiUrl}/api/user/${id}`);
  }
}
