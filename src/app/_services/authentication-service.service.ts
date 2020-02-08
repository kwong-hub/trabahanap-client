import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { environment } from '@environments/environment';
import { User } from '@app/_models/User';
import { ThrowStmt } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public userData;
  public token = JSON.parse(localStorage.getItem('token'));
  constructor(private http: HttpClient) {
    if (this.token) {
      let decodedToken = jwt_decode(this.token);
      this.currentUserSubject = new BehaviorSubject<any>({ ...decodedToken, id: decodedToken.sub, token: this.token });
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));
    }
    // console.log('loop')
    this.currentUser = this.currentUserSubject.asObservable();
  }



  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public set currentUserValue(value) {
    this.currentUserSubject.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('token', JSON.stringify(value));
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(map(data => {
        // console.log(data);
        // login successful if there's a jwt token in the response
        if (data.success) {
          if (data.user.token) {
            this.userData = data.user;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.setUserToken(data.user)
          }
        }

        return data;
      }));
  }

  getUserByid(token) {
    let decodedToken = jwt_decode(token);
    return this.http.get<any>(`${environment.apiUrl}/users/${decodedToken.sub}`)
      .pipe(map(data => {

        // console.log(data);
        // login successful if there's a jwt token in the response
        if (data.success) {
          if (data.user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.currentUserSubject.next(data.user)
          }
        }

        return data;
      }));
  }

  setUserToken(user) {
    localStorage.setItem('token', JSON.stringify(user.token));
    this.currentUserSubject.next(user);
    // this.getUserByid.unsubscribe();
  }

  logout() {
    // remove user from local storage to log user out
    this.currentUserSubject.next(null);
    localStorage.removeItem('token');

  }

  updateCurrentUser(user) {
    user.token = this.currentUserValue.token;
    localStorage.setItem('token', JSON.stringify(user.token));
    this.currentUserSubject.next(user);
  }

  saveSocialUser(user) {
    localStorage.setItem('token', JSON.stringify(user.token));
    this.currentUserSubject.next(user);
  }

  facebookLogin(access_token, social_id, user, role) {
    user.role = role.toUpperCase();
    return this.http.post<any>(`${environment.apiUrl}/auth/facebook/token`, { access_token, social_id, user });
  }

  googleLogin(access_token, social_id, user, role) {
    user.role = role.toUpperCase();
    return this.http.post<any>(`${environment.apiUrl}/auth/google/token`, { access_token, social_id, user });
  }

  resetPassword(email): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/forgot_password`, { email })
  }

  changePassword(currentPassword, newPassword, confirmPassword): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/change_password`, { currentPassword, newPassword, confirmPassword });
  }

  getUserByEmail(email): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/user/${email}`);
  }

  getUserByToken(token): Observable<any> {
    let decodedToken = jwt_decode(token);
    return this.http.get<any>(`${environment.apiUrl}/users/${decodedToken.sub}`);
  }

  checkValidUser(user): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/validate`, user)
  }

  setPassword(obj): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/set_password`, obj)
  }

  sendMessage(phonenumber): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/send_sms/${phonenumber}`);
  }

  confirmPasscode(obj): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/confirm_sms_passcode`, obj)
  }
}
