import { Component } from "@angular/core";

@Component({
    template: `<div class="login_container">
        <app-subheader [pageName]="pageName"></app-subheader>
        <div class="main">
            <div class="logo">
                <img src="/assets/icons/logo.ico" alt="logo"/>
                <span>Joe</span>
                <span>links</span>
            </div>
            <form #loginForm="ngForm" (ngSubmit)=login(loginForm.value)>
                <div class="form-group" >
                    <label for="username">Username </label>
                    <em *ngIf="loginForm.controls.name?.invalid &&
                    (loginForm.controls.name?.touched || mouseOverLogin)
                    ">Required</em>
                    <input type="text" (ngModel)="name" name="username" class="form-control" placeholder="username" />
                </div>
                <div class="form-group">
                    <label for="password">Password </label> 
                    <em *ngIf="loginForm.controls.password?.invalid">Required</em>
                    <input type="text" (ngModel)="password" name="password" class="form-control" placeholder="password" />               
                </div>
                <span (mouseenter)="mouseOverLogin=true" (mouseleave)="mouseOverLogin=false">
                    <button class="btn btn-danger" (disabled)="loginForm.invalid">Login</button>
                </span>
            </form>
        </div>
    </div>`,
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

export class LoginComponent {
    pageName:string = "Login";
    mouseOverLogin;
}