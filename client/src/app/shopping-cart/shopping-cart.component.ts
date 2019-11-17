import { Component, OnInit} from "@angular/core";
import { CartStoreService } from '../shared/cart-store.service';
import { Observable } from 'rxjs';
import { ICartItem } from '../interfaces/cart-item';

@Component({
    templateUrl: "./shopping-cart.component.html",
    styleUrls: ["./shopping-cart.component.css"]
})

export class ShoppingCartComponent {
    pageName:string = "Shopping Cart";
    cart:Observable<ICartItem[]>;

    constructor(private cartstoreService: CartStoreService){}
    ngOnInit(){
        this.getCart();
    }
    onQuantityChange(productId:string, quantity:number):void{
        quantity >=1 && this.cartstoreService.updateProductQuantity(productId, quantity);
    }
    getCart(){
        this.cart = this.cartstoreService.getCart();
    }
    getTotalPrice(cart:ICartItem[]):number{
        return cart.reduce( (acc:number, cur:ICartItem):number => acc + (cur.price*cur.quantity), 0);
    }
    removeProduct(productId:string):void {
        this.cartstoreService.removeProduct(productId);
    }
}