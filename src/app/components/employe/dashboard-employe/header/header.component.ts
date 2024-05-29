import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InfoService } from 'src/app/services/employe/info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  myDate = new Date();
  infoForm !: FormGroup
  currentTime: string | undefined;
  user:any;

  ngOnInit() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
    this.getInfoEmp();
  }

    constructor(private formBuilder: FormBuilder,private infoService:InfoService){
      this.infoForm = this.formBuilder.group({
        email: [localStorage.getItem("email")],
      })
    }

    getInfoEmp(){
      console.log(this.infoForm.value);
      this.infoService.getInfoEmp(this.infoForm.value).subscribe((data:any) => {
        console.log(data);
        console.log(this.user);
        
      })
    }
}
