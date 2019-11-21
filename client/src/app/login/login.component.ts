import { Component, OnDestroy } from "@angular/core";
import { AuthService } from '../shared';
import { Subscription } from 'rxjs';

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
    .logo :nth-child(2) {
        color: crimson;
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

export class LoginComponent implements OnDestroy {
    pageName:string = "Login";
    mouseOverLogin;
    errorMessage:string = "";
    loading: boolean = false;
    authSub:Subscription;

    constructor(private authService: AuthService){}

    login(user:any){
        this.loading = true;
        this.authSub = this.authService.login(user)
        .subscribe( 
            data => {
            this.authService.setCurrentUser(data.token);
            this.loading = false;
            },
            err => {
                this.errorMessage = err
                this.loading = false;
            }
            
        )
        
    }
    ngOnDestroy(){
        if(this.authSub)
            this.authSub.unsubscribe();
    }
}