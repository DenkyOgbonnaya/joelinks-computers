import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from './auth.service';

@Injectable({providedIn: "root"})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router:Router){}

    canActivate():boolean{
        const currentUser:any = this.authService.isCurrentUser();
        if(currentUser)
            return currentUser.isAdmin;
        this.router.navigate(["/"]);
        return false;
    }
}