import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    template: `<div class="login_container">
        <app-subheader [pageName]="pageName"></app-subheader>
        <div class="main">
            <div class="logo">
                <img src="/assets/icons/logo.ico" alt="logo"/>
                <span>Joe</span>
                <span>links</span>
            </div>
            <form [formGroup]="signupForm">
                <div class="form-group">
                    <label for="username">Username </label>
                    <input type="text" name="username" formControlName="username" class="form-control" placeholder="username" />
                </div>
                <div class="form-group">
                    <label for="email">Email </label>
                    <input type="text" name="email" formControlName="email" class="form-control" placeholder="email" />
                </div>
                <div class="form-group">
                    <label for="password">Password </label>
                    <input type="password" name="password" formControlName="password" class="form-control" placeholder="password" />
                </div>
                <button class="btn btn-danger">Sign up</button>
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

export class SignupComponent implements OnInit {
    pageName:string = "Sign up";
    signupForm:FormGroup;

    ngOnInit(){
        this.initSignupForm();
    }
    initSignupForm(){
        let username = new FormControl("", Validators.required);
        let email = new FormControl("", Validators.required);
        let password = new FormControl("", Validators.required);

        this.signupForm = new FormGroup({
            username,
            email,
            password
        })
    }
    
}