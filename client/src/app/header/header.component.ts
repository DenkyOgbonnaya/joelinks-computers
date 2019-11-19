import { Component, OnInit } from '@angular/core';
import { CartStoreService } from '../shared/cart-store.service';
import { Observable } from 'rxjs';
import { ICartItem } from '../shopping-cart/shared/cart-item';
import { AuthService } from '../shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cart$:Observable<ICartItem[]>;
  currentUser$:Observable<any>;
  constructor(private cartstoreService:CartStoreService, private authService: AuthService) { }

  ngOnInit() {
    this.getNumOfCartItems();
    this.getCurrentUser();
  }
  getNumOfCartItems(){
    this.cart$ = this.cartstoreService.getCart();
  }
  getCurrentUser(){
    this.currentUser$ = this.authService.getCurrentUser();
  }
  logoutUser(){
    this.authService.logout();
  }
}
