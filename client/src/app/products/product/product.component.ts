import { Component, Input } from "@angular/core";
import { CartStoreService, NotificationService } from "../../shared"; //'src/app/shared';
import { Product } from '../shared';


@Component({
    selector: "products-product",
    template: `
    <div class="product_card" [routerLink] = "['/product', product?._id]" >
    <img src={{product?.images[0].url}} alt="product" />
    <div class="product_atr">
        <div class="product_name">{{product?.name | slice:0:16}}  ... </div>
        <div> {{product?.price | currency:"N"}} </div>
    </div>
<button class="cart_btn" (click)= "addToCart($event)">ADD TO CART</button>
        </div>
    `,
    styles: [`
    .product_card {
        width: 130px;
    }
    .product_card:hover {
        cursor: pointer;
    }
    .product_atr {
        padding: 10px;
        font-size: 11px;
    }
    img {
        width: 100%;
        height: 100px;
    }
    .product_name {
        font-weight: bold;
    }
    .cart_btn {
        width: 100%;
        font-size: 10px;
        border-color: #ccc;
    }
    `]
})

export class ProductComponent {
    @Input() product:Product | undefined;
    constructor(private cartstoreService: CartStoreService, private notifyService: NotificationService){}

    addToCart(e:any){
        e.stopPropagation();
        if(this.product){
            const{_id, name, price, images} = this.product;
            this.cartstoreService.addToCart({_id, name, price, image:images[1].url, quantity:1});

            this.notifyService.showSuccessMessage("Notification", "Added to cart!");
        }
        
    }
}