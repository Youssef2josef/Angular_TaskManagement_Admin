import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthEmployeComponent } from './components/employe/auth-employe/auth-employe.component';
import { RegisterEmployeComponent } from './components/employe/register-employe/register-employe.component';
import { AuthAdminComponent } from './components/admin/auth-admin/auth-admin.component';
import { AuthManagerComponent } from './components/manager/auth-manager/auth-manager.component';
import { RegisterManagerComponent } from './components/manager/register-manager/register-manager.component';
import { DashboardEmployeComponent } from './components/employe/dashboard-employe/dashboard-employe.component';
import { authGuard } from './services/auth.guard';
import { authAdminGuard } from './services/auth-admin.guard';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';
import { AdminEmployeesComponent } from './components/admin/admin-employees/admin-employees.component';
import { GearAdminComponent } from './components/admin/gear-admin/gear-admin.component';
import { AdminManagersComponent } from './components/admin/admin-managers/admin-managers.component';

const routes: Routes = [
  { path:"",component:AuthAdminComponent},
  { path:"admin/dashboard",component: DashboardAdminComponent,canActivate: [authAdminGuard] },
  { path:"admin/dashboard/managers",component: AdminManagersComponent,canActivate: [authAdminGuard] },
  { path:"admin/dashboard/settings",component: GearAdminComponent,canActivate: [authAdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
