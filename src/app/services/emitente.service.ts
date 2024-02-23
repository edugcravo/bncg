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

editaEmitente(emitente: any){
  return this.http.put(this.url + '/emitente/edita', emitente, { headers: this.headers })

}

retornaPorId(id: any){
  return this.http.get(`${this.url}/emitente/retorna-por-id?id=${id}`, { headers: this.headers });
}

}
