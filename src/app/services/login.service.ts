import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient) { }

  url = environment.apiUrl
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Enconding': 'gzip'
  });


  login(body: any) {
    console.log(body)
    return new Promise(resolve => {
      this.http.post(this.url + '/login/login', body, { headers: this.headers }).subscribe(data => {
        resolve(data)
      })
    })
  }

}  