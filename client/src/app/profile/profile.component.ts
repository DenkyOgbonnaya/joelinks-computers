import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService, NotificationService } from '../shared';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit, OnDestroy {
    isLoading:boolean = false;
    errorMessage:string = "";
    user:any | undefined;
    authSub:Subscription | undefined;
    profileForm:FormGroup | undefined;

    constructor(
        private formBuilder: FormBuilder, 
        private authService: AuthService,
        private route: ActivatedRoute,
        private notify: NotificationService
        ){
        this.profileForm = this.initForm(this.formBuilder)
    }

    getUser(userId:string){
        
        this.authSub = this.authService.getUser(userId)
        .subscribe( (data:any) => {
            this.user = data.user;
            
            this.setProfile(data.user.profile)
        })
    }
    setProfile(data:any){
        if(data)
            this.profileForm.patchValue(data);
    }
    saveProfile(data:any){
        this.isLoading = true;
        
        this.authSub = this.authService.saveProfile(this.user._id, data)
        .subscribe( 
            (data:any) => {
                this.isLoading = false;
                this.notify.showSuccessMessage("Success", "Your changes have been saved")
            },
            (err:any) => {
                this.isLoading = false;
                this.errorMessage = err;
                
            }
        )
    }
    logout(){
        this.authService.logout();
    }
    initForm(formBuilder: FormBuilder){
        return formBuilder.group({
            firstname: [''],
            lastname: [''],
            phone: [''],
            address: [''],
            city: [''],
            state: ['']
        })
    }

    ngOnInit(){
        const userId = this.route.snapshot.params['id'];
        this.getUser(userId)
    }
    ngOnDestroy(){
        if(this.authSub){
            this.authSub.unsubscribe();
        }
    }
}