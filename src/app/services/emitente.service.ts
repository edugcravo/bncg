import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmitenteService {

constructor(private http: HttpClient) { }

url = environment.apiUrl

headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept-Enconding': 'gzip',
  Authorization: 'Bearer ' + localStorage.getItem('token')
});

cadastrarEmitente(emitente: any){
  return this.http.post(this.url + '/emitente/salva', emitente, { headers: this.headers })
}

retornaEmitente(){
  return this.http.get(this.url + '/emitente/lista', { headers: this.headers })
}

}
