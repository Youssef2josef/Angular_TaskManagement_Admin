import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (!localStorage.getItem('token') && !localStorage.getItem('email') && !localStorage.getItem('employee')) {
    router.navigate(['']);
    return false;
  }
  return true;
};
