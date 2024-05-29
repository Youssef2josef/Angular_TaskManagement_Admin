import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParametreService {

  constructor(private http: HttpClient) { }
  settingUrl: string = "http://localhost:8070/api/v2/admin/settings";

  changePassword(request:any){
    return this.http.patch(this.settingUrl + "/password",request);
  }

}
