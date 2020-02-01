import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models/User';
import { ThrowStmt } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public set currentUserValue(value) {
    this.currentUserSubject.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('currentUser', JSON.stringify(value));
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        map(data => {
          // login successful if there's a jwt token in the response
          if (data.success) {
            if (data.user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(data.user));
              this.currentUserSubject.next(data.user);
            }
          }

          return data;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  updateCurrentUser(user) {
    user.token = this.currentUserValue.token;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  saveSocialUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  facebookLogin(access_token, social_id, user, role) {
    user.role = role.toUpperCase();
    return this.http.post<any>(`${environment.apiUrl}/auth/facebook/token`, {
      access_token,
      social_id,
      user
    });
  }

  googleLogin(access_token, social_id, user, role) {
    user.role = role.toUpperCase();
    return this.http.post<any>(`${environment.apiUrl}/auth/google/token`, {
      access_token,
      social_id,
      user
    });
  }

  resetPassword(email): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/forgot_password`, {
      email
    });
  }

  changePassword(currentPassword, newPassword, confirmPassword): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/change_password`, {
      currentPassword,
      newPassword,
      confirmPassword
    });
  }

  getUserByEmail(email): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/user/${email}`);
  }

  checkValidUser(user): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/validate`, user);
  }

  setPassword(obj): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/set_password`, obj);
  }

  sendMessage(phonenumber): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/send_sms/${phonenumber}`);
  }

  confirmPasscode(obj): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/confirm_sms_passcode`, obj);
  }
}
