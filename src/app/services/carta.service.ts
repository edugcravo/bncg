import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartaService {

constructor(private http: HttpClient) { }

url = environment.apiUrl

headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept-Enconding': 'gzip',
  Authorization: 'Bearer ' + localStorage.getItem('token')
});

  enviaCarta(carta: any){
    console.log(carta)
    return this.http.post(this.url + '/carta/cria', carta, {headers: this.headers})
  }

  retornaCartas(){
    return this.http.get(this.url + '/carta/lista', {headers: this.headers})
  }

  retornaPropostaPorId(id: any){
    console.log(id)
    return this.http.get(this.url + '/carta/carta-certificado/' + id, {responseType: 'blob'});
}
}
