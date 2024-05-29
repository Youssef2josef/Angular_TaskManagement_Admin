import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  authUrl: string="http://localhost:8050/api/manager/auth";

  login(manager: any){
    return this.http.post(this.authUrl+"/authenticate",manager)
  }

  signup(newManager: any){
    return this.http.post(this.authUrl+"/register",newManager)  
  }

  verifyKey(key:any){
    return this.http.post(this.authUrl+"/key",key)
  }

  verifyQrCode(QrCode:any){
    return this.http.post(this.authUrl+"/verify",QrCode)
  }
}
