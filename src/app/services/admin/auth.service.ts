import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authUrl: string="http://localhost:8070/api/v1/admin/auth";

  login(admin: any){
    return this.http.post(this.authUrl+"/authenticate",admin)
  }

  verifyKey(key:any){
    return this.http.post(this.authUrl+"/key",key)
  }

  verifyQrCode(QrCode:any){
    return this.http.post(this.authUrl+"/verify",QrCode)
  }

}
