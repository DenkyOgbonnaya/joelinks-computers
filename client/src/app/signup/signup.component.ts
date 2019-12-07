import { Component, OnDestroy } from "@angular/core";
import { AuthService } from '../shared';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    templateUrl: "./signup.component.html",
    styles: [`
    .main {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        padding:10px;
    }
    em {
        color:red;
        float: right;
    }
    .logo {
        font-weight: bold;
        text-align: center;
    }
    .logo :nth-child(2) {
        color: crimson;
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

export class SignupComponent implements OnDestroy {
    pageName:string = "Signup";
    username:string;
    email:string;
    password:string;
    mouseOverCreate:boolean;
    errorMessage:string = "";
    loading: boolean = false;
    authSub:Subscription;

    constructor(private authService: AuthService, private router: Router){}

    signup(user:any){
        this.loading = true;
        this.authSub = this.authService.signup(user)
        .subscribe( 
            data => {
            this.authService.setCurrentUser(data.token);
            this.loading = false;
            this.router.navigate(["/"]);
            
            },
            err => {
                this.errorMessage = err;
                this.loading = false;
            }
            
        )
        
    }
    ngOnDestroy(){
        if(this.authSub)
            this.authSub.unsubscribe();
    }
    
}