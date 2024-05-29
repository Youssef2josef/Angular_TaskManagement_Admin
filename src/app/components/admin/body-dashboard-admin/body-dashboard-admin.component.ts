import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body-dashboard-admin',
  templateUrl: './body-dashboard-admin.component.html',
  styleUrls: ['./body-dashboard-admin.component.css']
})
export class BodyDashboardAdminComponent {

  
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
}
