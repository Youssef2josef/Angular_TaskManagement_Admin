import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeAdminStatusComponent } from '../edit-employee-admin-status/edit-employee-admin-status.component';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';


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

@Component({
  selector: 'app-admin-employees',
  templateUrl: './admin-employees.component.html',
  styleUrls: ['./admin-employees.component.css']
})

export class AdminEmployeesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'numTel', 'adresse', 'status', 'role', 'edit'];
  dataSource: MatTableDataSource<EmployeeData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService: AdminService,
    private dialog: MatDialog,
    private tokenStorageService: TokenStorageService,
    private router: Router) {
    this.dataSource = new MatTableDataSource<EmployeeData>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.adminService.getAllEmployees().subscribe((data: EmployeeData[]) => {
      //console.log(data);
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editEmployee(id: any) {
    this.dialog.open(EditEmployeeAdminStatusComponent,{
      width:'500px',
      data:{
      title: 'Edit Employee Status',
      id: id
      }
    })
  }
}
