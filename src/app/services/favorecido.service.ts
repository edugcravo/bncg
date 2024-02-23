import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavorecidoService {

constructor(private http: HttpClient) { }

headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept-Enconding': 'gzip',
  Authorization: 'Bearer ' + localStorage.getItem('token')
});

url = environment.apiUrl

cadastraFavorecido(favorecido: any){
  return this.http.post(this.url + '/favorecido/salva', favorecido, { headers: this.headers })
}

retornaFavorecidos(){
  return this.http.get(this.url + '/favorecido/lista', { headers: this.headers })
}
}
