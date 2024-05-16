import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../feature/service/auth.service';

export const autoLoginGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAutheticateUser()) {
    router.navigate(['dashboard']);
    return false;
  }
  return true;
};
