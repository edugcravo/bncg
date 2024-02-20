import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor(private http: HttpClient) { }

  url = environment.apiUrl

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Enconding': 'gzip'
  });

}
