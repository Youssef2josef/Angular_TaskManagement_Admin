import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InfoService } from 'src/app/services/admin/info.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {

  myDate = new Date();
  infoForm !: FormGroup
  currentTime: string | undefined;
  user:any;
  dashboardMenuOpen: boolean = false;

  ngOnInit() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
    this.getInfoAdmin();
  }

    constructor(private formBuilder: FormBuilder,private infoService:InfoService,
      private tokenStorage:TokenStorageService){
      this.infoForm = this.formBuilder.group({
        email: [localStorage.getItem("email")],
      })
    }

    toggleDashboardMenu() {
      this.dashboardMenuOpen = !this.dashboardMenuOpen;
    }

    getInfoAdmin(){
      this.infoService.getInfoAdmin(this.infoForm.value).subscribe((data:any) => {
        this.user = data;
      })
    }

    logout(){
      this.tokenStorage.signOut();
      window.location.reload();
    }
}
