import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  authSub: Subscription;
  constructor(private authService: AuthService){}

  persistUser(){
    const authToken = localStorage.authToken;

    if(authToken){
      this.authSub = this.authService.verifyToken(authToken)
      .subscribe( data => {
        if(data && data.isAuthenticated){
          this.authService.setCurrentUser(authToken)
        }else {
          this.authService.logout();
        }
      },
      err => console.log(err)
      
      )
    }
  }
  ngOnInit(){
    this.persistUser();
  }
  ngOnDestroy(){
    this.authSub.unsubscribe();
  }
}
