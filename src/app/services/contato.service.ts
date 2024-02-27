import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatoService implements OnInit{

constructor(private http: HttpClient) { }

headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept-Enconding': 'gzip'
});

url = environment.apiUrl

ngOnInit() {

}

enviarContato(contato: any){
  return this.http.post(this.url + '/contato/salva', contato, { headers: this.headers })
}

enviarEmail(contato: any){
  return this.http.post(this.url + '/contato/send_email', contato, { headers: this.headers })
}
}
