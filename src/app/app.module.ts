import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthEmployeComponent } from './components/employe/auth-employe/auth-employe.component';
import { AuthManagerComponent } from './components/manager/auth-manager/auth-manager.component';
import { AuthAdminComponent } from './components/admin/auth-admin/auth-admin.component';
import { RegisterEmployeComponent } from './components/employe/register-employe/register-employe.component';
import { RegisterManagerComponent } from './components/manager/register-manager/register-manager.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './components/employe/dashboard-employe/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from  'ng-otp-input';
import { DashboardEmployeComponent } from './components/employe/dashboard-employe/dashboard-employe.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { FooterComponent } from './components/employe/dashboard-employe/footer/footer.component';
import { SidebarComponent } from './components/employe/dashboard-employe/sidebar/sidebar.component';
import { BodyComponent } from './components/employe/body/body.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';
import { HeaderAdminComponent } from './components/admin/dashboard-admin/header-admin/header-admin.component';
import { SidebarAdminComponent } from './components/admin/dashboard-admin/sidebar-admin/sidebar-admin.component';
import { FooterAdminComponent } from './components/admin/dashboard-admin/footer-admin/footer-admin.component';
import { BodyDashboardAdminComponent } from './components/admin/body-dashboard-admin/body-dashboard-admin.component';
import { AdminEmployeesComponent } from './components/admin/admin-employees/admin-employees.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { InterceptorService } from './services/interceptor.service';
import { EditEmployeeAdminStatusComponent } from './components/admin/edit-employee-admin-status/edit-employee-admin-status.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { GearAdminComponent } from './components/admin/gear-admin/gear-admin.component';
import { MatMenuModule } from '@angular/material/menu';
import { AdminManagersComponent } from './components/admin/admin-managers/admin-managers.component';
import { BodyGearAdminComponent } from './components/admin/gear-admin/body-gear-admin/body-gear-admin.component';
import { AdminSettingsComponent } from './components/admin/gear-admin/admin-settings/admin-settings.component';
import { BodyAdminManagersComponent } from './components/admin/admin-managers/body-admin-managers/body-admin-managers.component';
import { EditManagersAdminStatusComponent } from './components/admin/edit-managers-admin-status/edit-managers-admin-status.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthEmployeComponent,
    AuthManagerComponent,
    AuthAdminComponent,
    RegisterEmployeComponent,
    RegisterManagerComponent,
    HeaderComponent,
    DashboardEmployeComponent,
    FooterComponent,
    SidebarComponent,
    BodyComponent,
    DashboardEmployeComponent,
    DashboardAdminComponent,
    HeaderAdminComponent,
    SidebarAdminComponent,
    FooterAdminComponent,
    BodyDashboardAdminComponent,
    AdminEmployeesComponent,
    EditEmployeeAdminStatusComponent,
    GearAdminComponent,
    AdminManagersComponent,
    BodyGearAdminComponent,
    AdminSettingsComponent,
    BodyAdminManagersComponent,
    EditManagersAdminStatusComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule, 
    BrowserAnimationsModule,
    MatListModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    NgOtpInputModule,
    MatStepperModule,
    MatChipsModule,
    MatSelectModule,
    SidebarModule,
    MatToolbarModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    MatRadioModule,
    DropDownButtonModule,
    MatMenuModule
  ],
  providers : [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {showError: true}
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
