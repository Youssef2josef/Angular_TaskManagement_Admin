import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  authUrl: string="http://localhost:8090/api/employe/auth";

  login(user: any){
    return this.http.post(this.authUrl+"/authenticate",user)
  }

  signup(newUser: any){
    return this.http.post(this.authUrl+"/register",newUser)  
  }

  verifyKey(key:any){
    return this.http.post(this.authUrl+"/key",key)
  }

  verifyQrCode(QrCode:any){
    return this.http.post(this.authUrl+"/verify",QrCode)
  }
}
