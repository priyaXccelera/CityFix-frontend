import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isAdminRole } from '../types';
export const authGuard: CanActivateFn = () => { const auth = inject(AuthService); return auth.isAuthenticated() ? true : inject(Router).createUrlTree(['/login']); };
export const adminGuard: CanActivateFn = () => { const auth = inject(AuthService); return isAdminRole(auth.currentRole()) ? true : inject(Router).createUrlTree(['/access-denied']); };
export const superAdminGuard: CanActivateFn = () => { const auth = inject(AuthService); return auth.currentRole() === 'SUPER_ADMIN' ? true : inject(Router).createUrlTree(['/access-denied']); };
