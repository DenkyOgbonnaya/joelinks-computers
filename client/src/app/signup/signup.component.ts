import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../shared';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: "./signup.component.html",
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
    mouseOverLogin;
    errorMessage:string = "";
    loading: boolean = false;
    authSub:Subscription;

    constructor(private authService: AuthService){}

    signup(user:any){
        this.loading = true;
        this.authSub = this.authService.signup(user)
        .subscribe( 
            data => {
            this.authService.setCurrentUser(data.token);
            this.loading = false;
            
            },
            err => {
                this.errorMessage = err;
                this.loading = false;
            }
            
        )
        
    }
    ngOnDestroy(){
        this.authSub.unsubscribe();
    }
    
}