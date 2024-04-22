import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const AuthGuard: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const loginService = inject(LoginService);

  if (!loginService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }
  return true;
};
