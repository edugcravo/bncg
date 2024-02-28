import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { Document, Packer } from 'docx';

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
    return this.http.post(this.url + '/carta/cria', carta, {headers: this.headers})
  }

  retornaCartas(){
    return this.http.get(this.url + '/carta/lista', {headers: this.headers})
  }

  retornaPropostaPorId(id: any){
    return this.http.get(`${this.url}/carta/carta-por-id?pin=${id}`, {responseType: 'blob'});
}

  retornaCertificadoPorId(id: any){
    return this.http.get(`${this.url}/carta/certificado-por-id?pin=${id}`, {responseType: 'blob'});
  }



}
