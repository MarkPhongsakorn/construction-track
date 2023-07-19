import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const currentUserPosition = this.authService.getPos();

    // ตรวจสอบว่าเมื่อเข้าถึงหน้า dashboard ผู้ใช้งานต้องเป็น admin เท่านั้น
    if (route.routeConfig && route.routeConfig.path) {
      if (route.routeConfig.path === "dashboard" && currentUserPosition !== "2") {
        this.router.navigate(['/login']);
        return false;
      }

      if (route.routeConfig.path === "company" && currentUserPosition !== "1") {
        this.router.navigate(['/login']);
        return false;
      }
    }

    return true;
    // if (this.authService.getLogin()) {
    //   return true;
    // }
    // this.router.navigate(['/login']);
    // return false;
  }
}
