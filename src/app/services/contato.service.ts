import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatoService implements OnInit{

constructor(private http: HttpClient) { }

url = environment.apiUrl

ngOnInit() {

}

enviarContato(contato: any){
  return this.http.post(this.url + '/contato/salva', contato)
}
}
