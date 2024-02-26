import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient, private router: Router, private sharedService:SharedService) { }

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
        console.log(data)
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
  localStorage.removeItem('ad');
  //avisasr pro componente menu-superior que o usuario deslogou

  this.sharedService.setAdminStatus(false);
  this.sharedService.setUserStatus(false);

  this.router.navigate(['/pin']);
  }


}
