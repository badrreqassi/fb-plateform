import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../../models/User";
import {environment} from "../../../../../environments/environment";
import {PasswordRequest} from "../../../../models/PasswordRequest";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsersList(pageNum = 0 as number, pageSize = 10 as number) : Observable<User[]>{
    return this.http.get<User[]>(`${environment.server.mainApiUrl}/api/users/${pageNum}/${pageSize}`);
  }
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${environment.server.mainApiUrl}/api/users/${userId}`);
  }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${environment.server.mainApiUrl}/api/user`,user);
  }

  updateUser(id: number, user: User): Observable<User>{
    return this.http.put<User>(`${environment.server.mainApiUrl}/api/user/${id}`,user);
  }

  changePassword(id: number, passwordReq: PasswordRequest): Observable<User>{
    return this.http.put<User>(`${environment.server.mainApiUrl}/api/user/updatePassword/${id}`,passwordReq);
  }

  changeUserPassword(id: number, newPassword: string): Observable<User>{
    return this.http.put<User>(`${environment.server.mainApiUrl}/api/user/changePassword/${id}`,newPassword);
  }

  deleteUser(id: number): Observable<string>{
    return this.http.delete<string>(`${environment.server.mainApiUrl}/api/user/${id}`);
  }
}
