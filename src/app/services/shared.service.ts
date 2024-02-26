import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor(private http: HttpClient) { }

  url = environment.apiUrl

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Enconding': 'gzip'
  });

  private adminStatus = new Subject<boolean>();
  private userStatus = new Subject<boolean>();

  //verificar se o usuario é admin

  setAdminStatus(admin: boolean) {
    this.adminStatus.next(admin);
  }

  getAdminStatus(): Observable<boolean> {
    return this.adminStatus.asObservable();
  }

  //verificar se o usuario esta logado

  setUserStatus(user: boolean) {
    this.userStatus.next(user);
  }

  getUserStatus(): Observable<boolean> {
    return this.userStatus.asObservable();
  }
}
