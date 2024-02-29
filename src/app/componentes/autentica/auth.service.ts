import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
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

// Método para obter o token armazenado no localStorage
getToken() {
  return localStorage.getItem('token');
}

// Método para fazer a solicitação para o endpoint /login/users/me/username
getUsername(): Observable<string> {
  const token = this.getToken();
  if (!token) {
    // Se não houver token, trate de acordo com a sua lógica
    return throwError('Token não encontrado');
  }
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Enconding': 'gzip',
    'Authorization': 'Bearer ' + token
  });
  return this.http.get<string>(this.url + '/login/users/me/username', { headers: headers });
  
}

// metodo para ver se usuario é adm
getAdmin(): Observable<boolean> {
  const token = this.getToken();
  if (!token) {
    // Se não houver token, trate de acordo com a sua lógica
    return throwError('Token não encontrado');
  }
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Enconding': 'gzip',
    'Authorization': 'Bearer ' + token
  });
  return this.http.get<boolean>(this.url + '/login/users/me/admin', { headers: headers });
  
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
  this.notifyLoginStatusChange(false);
  this.router.navigate(['/pin']);
  }


  private loginStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getLoginStatus(): Observable<boolean> {
    return this.loginStatusSubject.asObservable();
  }

  notifyLoginStatusChange(status: boolean) {
    this.loginStatusSubject.next(status);
  }

  // para escutar o status do login
  // this.authService.getLoginStatus().subscribe(logado => {
  //   console.log(logado)
  //   this.logado = logado;
  // });
}
