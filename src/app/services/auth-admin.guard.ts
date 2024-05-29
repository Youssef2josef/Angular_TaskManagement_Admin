import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenStorageService } from './token-storage.service';

export const authAdminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const http = inject(HttpClient);
  const tokenStorageService = inject(TokenStorageService);
  var token_auth = localStorage.getItem('auth-token');
  if(!localStorage.getItem('auth-token') && !localStorage.getItem('email') && !localStorage.getItem('admin')){
    Swal.fire({
      title: 'Unauthorized',
      text: 'You have to log in again',
      icon: 'error',
      confirmButtonText: 'OK',
      timer: 3500
    });
    router.navigate(['']);
  }

  if(localStorage.getItem('auth-token')){
    if(token_auth){
      tokenStorageService.validateTokenAdmin(token_auth).subscribe(
        (isValid) => {
          if(!isValid){
          //token is invalid  
          //console.log('Token validation:', isValid);
          sessionStorage.setItem( "IsLoggedIn", "false" );
          Swal.fire({
            title: 'Unauthorized',
            text: 'Your session has expired. Please log in again.',
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3500
          });
          tokenStorageService.signOut();
          sessionStorage.clear();
          router.navigate([""])
          return false;
          }
          else{
          //token is valid
          //console.log('Token validation:',isValid);
          sessionStorage.setItem( "IsLoggedIn", "true" );
          return true;
          }
        },
        (error: HttpErrorResponse) => {
          sessionStorage.setItem( "IsLoggedIn", "false" );
          if(error.error.isTrusted == true){
            Swal.fire({
              title: 'Unauthorized',
              text: 'Server is down. Try later',
              icon: 'error',
              confirmButtonText: 'OK',
              timer: 3500
            });
          }else
          {
            Swal.fire({
            title: 'Unauthorized',
            text: 'Your session has expired. Please log in again.',
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3500
              });
          }
          tokenStorageService.signOut();
          sessionStorage.clear();
          router.navigate([""])
        }
      );
      }
  }
  return true;
};

