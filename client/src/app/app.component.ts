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
  title:string = 'client';
  authSub: Subscription | undefined;
  paramSub:Subscription | undefined;
  constructor(private authService: AuthService, private route:ActivatedRoute){}

  persistUser(authToken:string){
    
    if(authToken){
      this.authSub = this.authService.verifyToken(authToken)
      .subscribe( (data:any) => {
        if(data && data.isAuthenticated){
          this.authService.setCurrentUser(authToken)
        }else {
          this.authService.logout();
        }
      },
      (err:any) => console.log(err)
      
      )
    }
  }
  //gets token from param if user is redirected through google login or local storage
  getTokenParam(){
    this.paramSub= this.route.queryParams.subscribe(params => {
      const token:string = params['token'];
      if(token)
        localStorage.authToken = token;

      const authToken:string = localStorage.authToken;
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
