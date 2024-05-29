import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, MatStepperModule } from '@angular/material/stepper';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgSwitch, NgSwitchCase, AsyncPipe } from '@angular/common';
import { AuthService } from 'src/app/services/employe/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-employe',
  templateUrl: './register-employe.component.html',
  styleUrls: ['./register-employe.component.css']
})
export class RegisterEmployeComponent {

  hide = true;
  selected = 'JUNIOR';
  response:any;
  user:any;
  messageErreur:any;

  firstFormGroup = this._formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    email: ['', Validators.compose([Validators.email, Validators.required])],
    password: ['',Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)])],
    numTel: ['',Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8),Validators.pattern(/^\d{8}$/)])],
  });
  thirdFormGroup= this._formBuilder.group({
    emailRecuperation: [''],
  });
  fourthFormGroup= this._formBuilder.group({
    adresse: ['', Validators.required],
    role: [this.selected, Validators.required],
  });

  multiStep = this._formBuilder.group({
    firstname: this.firstFormGroup.get('firstname'),
    lastname: this.firstFormGroup.get('lastname'),
    email: this.secondFormGroup.get('email'),
    password: this.secondFormGroup.get('password'),
    emailRecuperation: this.thirdFormGroup.get('emailRecuperation'),
    numTel: this.secondFormGroup.get('numTel'),
    adresse: this.fourthFormGroup.get('adresse'),
    role: this.fourthFormGroup.get('role'),
  });

  getErrorFirstName() {
    return this.firstFormGroup.controls["firstname"].hasError('required') ? 'Value Required' : '';
  }

  getErrorLastName() {
    return this.firstFormGroup.controls["lastname"].hasError('required') ? 'Value Required' : '';
  }

  getErrorNumTel() {
    if(this.secondFormGroup.controls["numTel"].hasError('required')){
      return 'You must enter a value';
    }
    return this.secondFormGroup.controls["numTel"].hasError('pattern') ? 'Phone Number 8 digits' : '';
  }

  getErrorEmail() {
    if (this.secondFormGroup.controls["email"].hasError('required')) {
      return 'You must enter a value';
    }
    return this.secondFormGroup.controls["email"].hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.secondFormGroup.controls["password"].hasError('required')) {
      return 'You must enter a value';
    }
    return this.secondFormGroup.controls["password"].hasError('pattern') ? 'At least : <br>1 character uppercase <br>'+ 
      '1 character lowercase <br> 1 lettre <br> 1 symbol <br> 8 characters' : '';
  }

  register(){
    if(this.firstFormGroup.controls['firstname'].hasError('required') ||
     this.firstFormGroup.controls['lastname'].hasError('required') || 
     this.secondFormGroup.controls['email'].hasError('required') || 
     this.secondFormGroup.controls['password'].hasError('required') || 
     this.secondFormGroup.controls['numTel'].hasError('required') || 
     this.fourthFormGroup.controls['adresse'].hasError('required') ||
     this.fourthFormGroup.controls['role'].hasError('required') 
      ){
      Swal.fire({
        title: 'Erreur de remplissage',
        text: 'Tous les champs sont necessaires',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 3000
      });
      return; 
    }
    if(this.secondFormGroup.controls['email'].hasError('email')){
      Swal.fire({
        title: 'Wrong Pattern',
        text: 'Email has wrong pattern',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 3000
      });
      return;
    }
    if(this.secondFormGroup.controls['password'].hasError('pattern')){
      Swal.fire({
        title: 'Wrong Pattern',
        text: 'Password has wrong pattern',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 3000
      });
      return;
    }
    if(this.secondFormGroup.controls['numTel'].hasError('pattern')){
      Swal.fire({
        title: 'Wrong Pattern',
        text: 'Phone number has wrong pattern',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 3000
      });
      return;
    }
    console.log(this.secondFormGroup.get('numTel'));
    console.log(this.secondFormGroup.controls['numTel']);
  
    console.log(this.multiStep.value);
    this.authService.signup(this.multiStep.value).subscribe((data:any) => {
      console.log(data);
      this.response = data;
      if(data.status == 201){
        this.user = data.employe;
        Swal.fire({
          title: 'Registration Successful',
          text: 'Verification Email has been sent \n Please activate your account',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000
        });
        this.router.navigate([""]);
      }
    },(error: HttpErrorResponse) => {
      // Traitement en cas d'erreur
      if (error.error && error.error.message) {
        Swal.fire({
          title: 'Echec',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 3000
        });
      } else {
        this.messageErreur="Erreur fatale";
        Swal.fire({
          title: 'Echec',
          text: this.messageErreur,
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 3000
        });
      }
    });
  }

  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver,
    private authService:AuthService, private router:Router) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    // Ajouter un écouteur d'événements pour détecter les changements dans la sélection du rôle
    this.fourthFormGroup.get('role')?.valueChanges.subscribe(value => {
      this.fourthFormGroup.patchValue({ role: value }, { emitEvent: false });
    });
  }

}
