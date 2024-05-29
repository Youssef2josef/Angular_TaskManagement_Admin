import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
} 

@Component({
  selector: 'app-admin-managers',
  templateUrl: './admin-managers.component.html',
  styleUrls: ['./admin-managers.component.css']
})
export class AdminManagersComponent {

  dashoboarshow= false;
  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    this.dashoboarshow= false
  }
}
