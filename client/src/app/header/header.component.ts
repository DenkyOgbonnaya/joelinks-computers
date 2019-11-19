import { Component, OnInit } from '@angular/core';
import { CartStoreService } from '../shared/cart-store.service';
import { Observable } from 'rxjs';
import { ICartItem } from '../shopping-cart/shared/cart-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cart$:Observable<ICartItem[]>;
  constructor(private cartstoreService:CartStoreService) { }

  ngOnInit() {
    this.getNumOfCartItems()
  }
  getNumOfCartItems(){
    this.cart$ = this.cartstoreService.getCart();
  }

}
