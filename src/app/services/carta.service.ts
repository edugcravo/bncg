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
  'Accept-Enconding': 'gzip'
});

  enviaCarta(carta: any){
    console.log(carta)
    return this.http.post(this.url + '/carta/cria', carta, {headers: this.headers})
  }


}
