import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenService } from '../http/authen.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  deniedMessage = '💂‍♀️ [Guard] - Auth Guard - Unauthorized access denied';

  constructor(private sessionService: AuthenService, private router: Router) {}

  canLoad(route: Route) {
    if (this.sessionService.isLoggedIn) {
      console.log(`💂‍♀️ [Guard] - Auth Guard - allowed`);
      return true;
    }

    const url = `/${route.path}`;
    this.router.navigate(['/signin'], { queryParams: { redirectTo: url } });
    console.warn(this.deniedMessage);
    return this.sessionService.isLoggedIn;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return true;
    // if (this.sessionService.isLoggedIn) {
    //   return true;
    // }
    // this.router.navigate(['/signin'], {
    //   queryParams: { redirectTo: state.url },
    // });
    // console.warn(this.deniedMessage);
    // return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
