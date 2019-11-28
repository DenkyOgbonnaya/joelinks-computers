import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from 'rxjs';
import { tap } from "rxjs/operators";
import { AuthService } from 'src/app/shared';

@Component({
    templateUrl: "./admin-users.component.html"
})
export class AdminUsersComponent implements OnInit, OnDestroy {
    users:any;
    authSub:Subscription;
    currentPage:number = 1;
    pages:number = 1;
    constructor(private authService:AuthService){}

    getUsers(pageNumber:number, limit:number){
        this.authSub = this.authService.getUsers(pageNumber, limit)
        .subscribe(
            data => {
                this.users = data.users;
                this.currentPage = data.page;
                this.pages = data.pages
            }
        )
    }
    changePage(pageNumber:number){
        this.getUsers(pageNumber, 20);
    }
    handleAdmin(event:any, userId:string){
        let status = event.target.value
        if(status === "make admin"){
            this.authService.makeAdmin(userId)
            .subscribe(data => {
                this.users = this.users.map( (user:any) => user._id === userId ? Object.assign({}, user, data.user) : user)
            })
        }else{
            this.authService.disAdmin(userId)
            .subscribe(data => {
                this.users = this.users.map( (user:any) => user._id === userId ? Object.assign({}, user, data.user) : user)
            })
        }
    }
    ngOnInit(){
        this.getUsers(1, 20);
    }
    ngOnDestroy(){
        if(this.authSub)
            this.authSub.unsubscribe();
    }
}