import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/manager/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-manager',
  templateUrl: './auth-manager.component.html',
  styleUrls: ['./auth-manager.component.css']
})
export class AuthManagerComponent implements OnInit{

  public configOptions = {
    length: 6,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between'
  }

  token_auth :any = localStorage.getItem('auth-token');
  otp!: string;
  number:any;
  inputDigitLeft: string = "Verify code";
  loginForm !: FormGroup
  keyVerification !: FormGroup
  qrCodeVerification !: FormGroup
  hide = true;
  navigation:boolean = false;
  x:boolean=false
  QrCode: boolean = false;
  response : any = {}
  QrCodeUrl:any


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService:AuthService,
    private tokenStorage: TokenStorageService) { }
  ngOnInit(): void {
    //this.validateToken();
    if(localStorage.getItem("email")
    && localStorage.getItem('auth-token')
    && localStorage.getItem('manager')
    && sessionStorage.getItem("IsLoggedIn") == "true") {
      this.router.navigate(["manager/dashboard"]);
    }
    if(localStorage.getItem("admin") || localStorage.getItem("employee")){
      alert("Hack Attempt")
      this.tokenStorage.signOut()
      sessionStorage.clear();
      this.navigation = false;
      window.location.reload();
    }
    if(sessionStorage.getItem("email")){
      if(localStorage.getItem("admin") || localStorage.getItem("employee")){
        alert("Hack Attempt")
        this.tokenStorage.signOut()
        this.navigation = false;
        window.location.reload();
      }
      else{
        this.navigation = true;
      }
    }
    if(sessionStorage.getItem("auth-QrCode")){
      if(localStorage.getItem("admin") || localStorage.getItem("employee")){
        alert("Hack Attempt")
        this.tokenStorage.signOut()
        this.navigation = false;
        window.location.reload();
      }
      else{
        this.navigation = true 
        this.QrCode = true
        this.QrCodeUrl = sessionStorage.getItem( "url-image")
      }
    }

    this.loginForm = this.formBuilder.group({
      email: new FormControl('',[Validators.email, Validators.required]),
      password: new FormControl('',[Validators.minLength(6),Validators.maxLength(40), Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)]),
      option: [false],
    })

    this.keyVerification = this.formBuilder.group({
      email: [sessionStorage.getItem("email")],
      key: ['',[Validators.required]],
    })

    this.qrCodeVerification = this.formBuilder.group({
      email: [sessionStorage.getItem("email")],
      code: ['',[Validators.required]],
    })
  }

  getErrorMessage() {
    if (this.loginForm.controls["email"].hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.controls["email"].hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.loginForm.controls["password"].hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.controls["password"].hasError('pattern') ? 'Not a valid password' : '';
  }

  getErrorMessageKey() {
    return this.keyVerification.controls["key"].hasError('required') ? 'You must enter the Key' : '';
  }

  getErrorMessageQrCode(){
    return this.qrCodeVerification.controls["code"].hasError('required') ? 'You must enter the Key' : '';
  }

  login() {
    //console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((data:any) => {
      //console.log(data);
      if(data.status == 200){
        this.response = data
        if(data.user){
        sessionStorage.setItem("email" , data.user);
        }
        if(this.loginForm.value.option == true){
          sessionStorage.setItem("email", this.loginForm.value['email']);
          sessionStorage.setItem( "auth-QrCode", "true");
          this.QrCode = true
          sessionStorage.setItem("url-image",this.response.secretImageUri)
          this.QrCodeUrl = sessionStorage.getItem("url-image")
        }
        this.navigation = true;
      }
      },(error: HttpErrorResponse) => {
        //console.log(error);
        if(error.error.isTrusted == true){
          Swal.fire({
            title: 'Failed Login',
            text: "System Error. Try again after while",
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3500
          });
        }
        else{
          Swal.fire({
            title: 'Failed Login',
            text: error.error,
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3500
          });
        }
        });
  }

  onOtpChange(event: any) {
    this.otp = event;
    //console.log("Numéro tapé:", event);

    if(this.otp.length < this.configOptions.length) {
      this.inputDigitLeft = this.configOptions.length - this.otp.length + " digits Left";
    }

    if(this.otp.length == this.configOptions.length) {
      this.inputDigitLeft = "Let's go!";
      console.log("Numéro complet:", this.otp);
      this.number = parseInt(this.otp);
      //console.log(this.number);
      // Configuration of keyVerifiation form
        if(sessionStorage.getItem("email")){
        this.keyVerification = this.formBuilder.group({
          email: [sessionStorage.getItem("email")],
          key: [this.number,[Validators.required]],
        })
        //console.log(this.keyVerification.value);
        this.x = true
        this.authService.verifyKey(this.keyVerification.value).subscribe((data:any) => {
          this.tokenStorage.signOut();
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(sessionStorage.getItem("email"));
          this.tokenStorage.saveManager(true);
          //console.log(data);
          if(data.status == 200){
            Swal.fire({
              title: 'Successful Login',
              text: 'Your Multi-Authentication By email has been successfully done',
              icon: 'success',
              confirmButtonText: 'OK',
              timer: 3500
            });
            this.router.navigate(["manager/dashboard"]);
            sessionStorage.clear();
          }
        })
        }
        // Configuration of qrCodeVerifiation form
        if(sessionStorage.getItem("auth-QrCode")){
          this.qrCodeVerification = this.formBuilder.group({
            email: [sessionStorage.getItem("email")],
            code: [this.number,[Validators.required]],
          })
          //console.log(this.qrCodeVerification.value);
          this.x = true
          this.authService.verifyQrCode(this.qrCodeVerification.value).subscribe((data:any) => {
            this.tokenStorage.signOut();
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(sessionStorage.getItem("email"));
            this.tokenStorage.saveManager(true);
            //console.log(data);
            if(data.status == 200){
              Swal.fire({
                title: 'Successful Login',
                text: 'Your Multi-Authentication By email has been successfully done',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3500
              });
              this.router.navigate(["manager/dashboard"]);
              sessionStorage.clear();
            }
          })
        }
    }
  }

  /*validateToken(){
    if(localStorage.getItem('auth-token')){
      if(this.token_auth){
        this.tokenStorage.validateTokenManager(this.token_auth).subscribe(
          (isExpired) => {
            if(isExpired){
            //token is invalid
            //console.log('Token validité:', isExpired);
            sessionStorage.setItem( "IsLoggedIn", "false" );
            }
            else{
            //token is valid
            //console.log('false');
            sessionStorage.setItem( "IsLoggedIn", "true" );
            window.location.reload();
            }
          },
          error => {
            // Gérer les erreurs
            //console.log('Erreur lors de la validation du token:', error);
            sessionStorage.setItem( "IsLoggedIn", "false" );
          }
        );
        }
    }
  }*/

}
