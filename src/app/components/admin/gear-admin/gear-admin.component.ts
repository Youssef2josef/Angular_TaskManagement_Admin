import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-gear-admin',
  templateUrl: './gear-admin.component.html',
  styleUrls: ['./gear-admin.component.css']
})
export class GearAdminComponent {

  dashoboarshow= false;
  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    this.dashoboarshow= false
  }

}
