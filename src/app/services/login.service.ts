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
    'Accept-Enconding': 'gzip',
    'Authorization': 'Bearer a7db01243de9e2c43250f6f1825a367efc602db30526e624e45ee20b4394f77b'
  });


  login(body: any) {
    console.log(body)
    return new Promise(resolve => {
      this.http.post(this.url + '/login/login', body, { headers: this.headers }).subscribe((data: any) => {
        console.log(data)
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('ad', data.admin);
        resolve(data)
      })
    })
  }


}
