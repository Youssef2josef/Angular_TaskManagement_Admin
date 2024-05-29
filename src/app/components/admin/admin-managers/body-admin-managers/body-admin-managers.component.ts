import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditManagersAdminStatusComponent } from '../../edit-managers-admin-status/edit-managers-admin-status.component';

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
  selector: 'app-body-admin-managers',
  templateUrl: './body-admin-managers.component.html',
  styleUrls: ['./body-admin-managers.component.css']
})
export class BodyAdminManagersComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'numTel', 'adresse', 'status', 'role', 'edit'];
  dataSource: MatTableDataSource<EmployeeData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService: AdminService,
    private dialog: MatDialog) {
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
    this.adminService.getAllManagers().subscribe((data: EmployeeData[]) => {
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
    this.dialog.open(EditManagersAdminStatusComponent,{
      width:'500px',
      data:{
      title: 'Edit Employee Status',
      id: id
      }
    })
  }
}
