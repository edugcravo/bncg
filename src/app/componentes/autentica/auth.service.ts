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

headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept-Enconding': 'gzip',
  Authorization: 'Bearer ' + localStorage.getItem('token')
});

verificarLogado() {


  return new Promise((resolve, reject) => {
    this.http.get(this.url + '/login/users/me', { headers: this.headers }).subscribe(
      (data) => {
        resolve(data);
      },

    );
  });
}



isLoggedIn(): boolean {
  // Verifica se o token JWT está presente no localStorage e se é adm pelo local storage
  return !!localStorage.getItem('token') && localStorage.getItem('ad') === 'true';
}


logout(){
  localStorage.removeItem('token');
  this.router.navigate(['/pin']);
  }


}
