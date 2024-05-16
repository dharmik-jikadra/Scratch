import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../feature/service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAutheticateUser()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
