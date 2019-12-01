import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './shared';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  authSub: Subscription;
  paramSub:Subscription;
  constructor(private authService: AuthService, private route:ActivatedRoute){}

  persistUser(authToken:string){
    console.log(authToken, "jfjjfjj");
    
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
  //gets token from param if user is redirected through google login or local storage
  getTokenParam(){
    this.paramSub= this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if(token)
        localStorage.authToken = token;

      const authToken = localStorage.authToken;
      this.persistUser(authToken);
  });
  }
  ngOnInit(){
    this.getTokenParam();
  }
  ngOnDestroy(){
    this.authSub.unsubscribe();
    if(this.paramSub)
      this.paramSub.unsubscribe();
  }
}
