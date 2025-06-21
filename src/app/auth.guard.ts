import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AppService } from '../services/app.service';

export const authGuard: CanActivateFn = (route, state) => {
  const appService = inject(AppService);
  const router = inject(Router);
  const data = appService.loginUser
  if(appService.loginUser !== null && appService.loginUser !== undefined && appService.loginUser !== ''){
  return true; // Allow access if the user is logged in
  }else{
    router.navigate(['/login']);
    return false; // Redirect to login if the user is not logged in
  }
};
