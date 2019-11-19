import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ICartItem } from '../shopping-cart/shared/cart-item';
import { CartService } from "./cart-service";

@Injectable()
export class CartStoreService {
    private _cart$ = new BehaviorSubject<ICartItem[]>([]);

    constructor(private cartBackEndService: CartService){}

    addToCart(product:ICartItem){
        const isCartProduct = this._cart$.getValue().find(item => item._id === product._id);

        if(isCartProduct){
            this.update(product._id, isCartProduct.quantity+1);
        }else{
            this._cart$.next(this._cart$.getValue().concat(product));
        }
        this.cartBackEndService.addToCart(product).subscribe();
    
    }
    update(productId:string, quantity:number){
        let cart = this._cart$.getValue().map(cartProduct => cartProduct._id === productId ? 
            Object.assign({}, cartProduct, {quantity}) : cartProduct);

        this._cart$.next(cart);
    }
    updateProductQuantity(productId:string, quantity:number){
        this.update(productId, quantity);

        this.cartBackEndService.updateQuantity(productId, quantity).subscribe();
    }
    getCart():Observable<ICartItem[]>{
        this.cartBackEndService.getCart().subscribe( (data:any) => {
            if(data.length > 0)
                this._cart$.next(data);
        })
        return this._cart$.asObservable();
        
    }
    removeProduct(productId:string):void{
        let cart = this._cart$.getValue().filter(product => product._id !== productId);
        this._cart$.next(cart);
        this.cartBackEndService.removeProduct(productId).subscribe();
    }
}