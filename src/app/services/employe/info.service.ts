import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient) { }
  infohUrl: string="http://localhost:8090/api/employe/info";

  getInfoEmp(email:any){
    return this.http.post(this.infohUrl,email);
  }
}
