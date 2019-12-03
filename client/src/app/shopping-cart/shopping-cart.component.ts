import { Component, OnInit, OnDestroy} from "@angular/core";
import { CartStoreService } from '../shared/cart-store.service';
import { Observable, Subscription } from 'rxjs';
import { ICartItem } from './shared/cart-item';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CheckoutComponent } from "./checkout/checkout.component";
import { AuthService } from '../shared';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

@Component({
    templateUrl: "./shopping-cart.component.html",
    styleUrls: ["./shopping-cart.component.css"]
})

export class ShoppingCartComponent implements OnInit, OnDestroy {
    pageName:string = "Shopping Cart";
    cart$:Observable<ICartItem[]>;
    currentUser:any;
    authSub:Subscription;
    baseUrl:string = environment.baseUrl

    constructor(
        private cartstoreService: CartStoreService, 
        private ModalService: NgbModal,
        private authService: AuthService,
        private router: Router
    ){}
        
    ngOnInit(){
        this.getCart();
        this.getCurrentUser();
    }
    onQuantityChange(productId:string, quantity:number):void{
        quantity >=1 && this.cartstoreService.updateProductQuantity(productId, quantity);
    }
    getCart(){
        this.cart$ = this.cartstoreService.getCart();
    }
    getTotalPrice(cart:ICartItem[]):number{
        return cart.reduce( (acc:number, cur:ICartItem):number => acc + (cur.price*cur.quantity), 0);
    }
    removeProduct(productId:string):void {
        this.cartstoreService.removeProduct(productId);
    }
    getCurrentUser(){
       this.authSub = this.authService.getCurrentUser()
        .subscribe( data => {
            this.currentUser = data;
        })
    }
    openCheckoutModal(){
        if(!this.currentUser){
            this.router.navigate(["/login"]);
            return;
        }
        const modalRef = this.ModalService.open(CheckoutComponent);
        modalRef.componentInstance.user = this.currentUser;

        modalRef.result.then(result => {
            console.log(result);
            
        })
        .catch(err => {
            console.log(err);
            
        })
    }
    ngOnDestroy(){
        this.authSub.unsubscribe();
    }
}