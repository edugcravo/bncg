import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient, private router: Router) { }

url = environment.apiUrl


verificarLogado() {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Enconding': 'gzip',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });

  return new Promise((resolve, reject) => {
    this.http.get(this.url + '/login/users/me', { headers }).subscribe(
      (data) => {
        resolve(data);
      },

    );
  });
}


isLoggedIn(): boolean {
  // Verifica se o token JWT está presente no localStorage
  return !!localStorage.getItem('token');
}


logout(){
  localStorage.removeItem('token');
  this.router.navigate(['/pin']);
  }
}
