import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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


  //verificar se o usuario é admin

  private adminStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setAdminStatus(admin: boolean) {
    this.adminStatus.next(admin);
  }

  getAdminStatus(): Observable<boolean> {
    return this.adminStatus.asObservable();
  }

  username: Subject<any> = new Subject<any>();

  setUsername(username: any) {
    this.username.next(username);
  }

  getUsername(): Observable<any> {
    return this.username.asObservable();
  }
}
