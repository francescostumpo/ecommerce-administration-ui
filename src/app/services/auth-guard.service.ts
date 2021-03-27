import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (!this.authService.isAuthenticated()) {
        this.authService.init().then(() => {
          this.authService.login()
            .catch(e => {
                console.error(e);
                return reject(false);
              }
            );
        });
      }
      const requiredRoles = route.data.expectedRoles;
      if (!requiredRoles || requiredRoles === 0) {
        return resolve(true);
      } else {
        const roles = this.authService.getRoles();
        if (!roles || roles.length === 0) {
          resolve(false);
        }
        resolve(requiredRoles.some(role => roles.indexOf(role) > -1));
      }
    });
  }
}
