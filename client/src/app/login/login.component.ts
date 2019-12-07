import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from '../shared';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: "./login.component.html",
    styles: [`
    .main {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        padding:10px;
    }
    .logo {
        font-weight: bold;
        text-align: center;
    }
    em {
        color: crimson;
        float: right;
    }
    .logo :nth-child(2) {
        color: crimson;
    }
    .google{
        text-align: center;
    }
    .spinner {
        text-align: center;
    }
    @media only screen and (min-width: 65.625em) {
        
        .main {
            width: 400px;
            margin:auto;
            margin-top: 50px;
        }
    }
    
    `]
})

export class LoginComponent implements OnInit, OnDestroy {
    pageName:string = "Login";
    mouseOverLogin:boolean | undefined;
    username:string = "";
    password:string = "";
    errorMessage:string = "";
    loading: boolean = false;
    authSub:Subscription | undefined;
    returnUrl:string | undefined;

    constructor(
        private authService: AuthService, 
        private route:ActivatedRoute,
        private router:Router
        ){}

    login(user:any){
        this.loading = true;
        this.authSub = this.authService.login(user)
        .subscribe( 
            (data:any) => {
            this.authService.setCurrentUser(data.token);
            this.loading = false;
            this.router.navigate([this.returnUrl]);
            },
            (err:any) => {
                this.errorMessage = err
                this.loading = false;
            }
            
        )
        
    }
    googleLogin(){
        window.location.href = 'https://joelinks-computers.herokuapp.com/api/auth/google';
    }
    ngOnInit(){
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || "/";
    }
    ngOnDestroy(){
        if(this.authSub)
            this.authSub.unsubscribe();
    }
}