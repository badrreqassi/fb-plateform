import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../../../../models/User";
import {environment} from "../../../../../environments/environment";
import {PasswordRequest} from "../../../../models/PasswordRequest";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsersList(pageNum = 0 as number, pageSize = 10 as number) : Observable<any>{
    return this.http.post<any>(`${environment.server.mainApiUrl}/api/users/${pageNum}/${pageSize}`,[]).pipe(
      map( response => {
        return response.data ;
      })
    );
  }
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${environment.server.mainApiUrl}/api/users/${userId}`);
  }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${environment.server.mainApiUrl}/api/user`,user);
  }

  updateUser(userId: number, user: User): Observable<User>{
    return this.http.put<User>(`${environment.server.mainApiUrl}/api/user/${userId}`,user);
  }

  changePassword(userId: number, passwordReq: PasswordRequest): Observable<User>{
    return this.http.put<User>(`${environment.server.mainApiUrl}/api/user/updatePassword/${userId}`,passwordReq);
  }

  changeUserPassword(userId: number, newPassword: string): Observable<User>{
    return this.http.put<User>(`${environment.server.mainApiUrl}/api/user/changePassword/${userId}`,newPassword);
  }

  deleteUser(userId: number): Observable<string>{
    return this.http.delete<string>(`${environment.server.mainApiUrl}/api/user/${userId}`);
  }
}
