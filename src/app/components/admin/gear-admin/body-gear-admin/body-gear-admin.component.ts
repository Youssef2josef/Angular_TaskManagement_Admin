import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body-gear-admin',
  templateUrl: './body-gear-admin.component.html',
  styleUrls: ['./body-gear-admin.component.css']
})
export class BodyGearAdminComponent {

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
