import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { Document, Packer } from 'docx';
import { Observable } from 'rxjs';

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
    console.log(localStorage.getItem('token'))
    return this.http.get(this.url + '/carta/lista', {headers: this.headers})
  }


  // PROPOSTA-----------------------------

  //retorna a carta fiança por id EM PDF
  retornaPropostaPorId(id: any){
    return this.http.get(`${this.url}/carta/carta-por-id?pin=${id}`, {responseType: 'blob' ,headers: this.headers});
}

  //retorna a carta fiança por id em formato de IMAGEM
  retornaPropostaPorIDemImagem(id: any, numero: number): Observable<Blob> {
    return this.http.get(`${this.url}/carta/carta-por-id-imagem-${numero}?pin=${id}`, {responseType: 'blob' ,headers: this.headers});
  }



  // CERTIFICADO -----------------------------

  //retorna o certificado por id EM PDF
  retornaCertificadoPorId(id: any){
    return this.http.get(`${this.url}/carta/certificado-por-id?pin=${id}`, {responseType: 'blob' ,headers: this.headers});
  }

  //retorna o certificado por id em formato de IMAGEM
  retornarCertificadoPorIDemImagem(id: any){
    return this.http.get(`${this.url}/carta/certificado-por-id-imagem?pin=${id}`, {responseType: 'blob' ,headers: this.headers});
  }



  // Excluir carta fiança por id -----------------

  excluirCartaPorId(id: any){
    return this.http.delete(`${this.url}/carta/excluir?pin=${id}`, {headers: this.headers})
  }
}
