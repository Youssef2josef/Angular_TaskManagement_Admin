import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface EmployeeData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  numTel: string;
  adresse: string;
  status: boolean;
  role: string;
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  employeeUrl: string = "http://localhost:8070/api/admin/employees";
  managerUrl: string = "http://localhost:8070/api/admin/managers";


  getAllEmployees(): Observable<EmployeeData[]> {
    return this.http.get<EmployeeData[]>(this.employeeUrl);
  }

  updateStatusEmployee(employee:any){
   return this.http.put(this.employeeUrl,employee);
  }

  getEmployeeById(id:any){
    return this.http.get(this.employeeUrl + "/" + id);
  }

  getAllManagers(): Observable<EmployeeData[]> {
    return this.http.get<EmployeeData[]>(this.managerUrl);
  }

  updateStatusManager(manager:any){
   return this.http.put(this.managerUrl,manager);
  }

  getManagerById(id:any){
    return this.http.get(this.managerUrl + "/" + id);
  }
}

