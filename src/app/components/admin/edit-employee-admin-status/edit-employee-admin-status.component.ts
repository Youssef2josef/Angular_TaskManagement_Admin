import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee-admin-status',
  templateUrl: './edit-employee-admin-status.component.html',
  styleUrls: ['./edit-employee-admin-status.component.css']
})
export class EditEmployeeAdminStatusComponent implements OnInit {

  findedEmployee: any
  editEmployeeForm!:FormGroup
  inputdata:any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private ref: MatDialogRef<EditEmployeeAdminStatusComponent>, 
  private router: Router, 
  private adminService: AdminService, 
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.inputdata = this.data;
    this.getEmployeeById();
  }

  getEmployeeById(){
    this.adminService.getEmployeeById(this.data.id).subscribe((res)=>{
      this.findedEmployee = res;
      //console.log(this.findedEmployee);
    })
  }

  onRadioChange(event: any) {
    //console.log('Value selected:', event.value);
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  editEmployee() {
    Swal.fire({
      title: 'Voulez-vous enregistrer les modifications?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Oui, Bien Sure',
      denyButtonText: `Non, Pas D'accord`,
      }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.adminService.updateStatusEmployee(this.findedEmployee).subscribe((res) => {
          //console.log("here res after edit", res);
          // Trigger data refresh in ObjectsTableComponent
          Swal.fire({
          title: 'Enregistré!',
          icon: 'success',
          timer: 2000, // Durée en millisecondes (ici, 2 secondes)
          showConfirmButton: true // Pour masquer le bouton "OK"
        });
        }, (error: HttpErrorResponse) => {
          // Traitement en cas d'erreur
          if (error.error && error.error.message) {
            Swal.fire({
              title: 'Echec',
              text: error.error.message,
              icon: 'warning',
              confirmButtonText: 'OK',
              timer: 2000 // Durée en millisecondes (3 secondes dans cet exemple)

            });
           //console.log(error);
          }
          else {
            Swal.fire({
              title: 'Echec',
              text: error.statusText,
              icon: 'warning',
              confirmButtonText: 'OK',
              timer: 2000 // Durée en millisecondes (3 secondes dans cet exemple)
    
            });
            //console.log(error);
          }
        })
        
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Les modifications ne sont pas enregistrées!',
          icon: 'info',
          timer: 2000, // Durée en millisecondes (ici, 2 secondes)
          showConfirmButton: true // Pour masquer le bouton "OK"
        });
      } else {
        Swal.fire({
          title: 'Modifications annuléss!',
          icon: 'info',
          timer: 2000, // Durée en millisecondes (ici, 2 secondes)
          showConfirmButton: true // Pour masquer le bouton "OK"
        });
      }
    })
  }
}
