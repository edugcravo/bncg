import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Enconding': 'gzip',
  });
  


  retornaUsuarios(){
    return this.http.get(this.url + '/login/lista-usuarios');
  }

  criaUsuario(usuario: any){
    return this.http.post(this.url + '/login/cria-usuario', usuario, {headers: this.headers});
  }
}
