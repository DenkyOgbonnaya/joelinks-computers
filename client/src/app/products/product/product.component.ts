import { Component, Input } from "@angular/core";
import { CartStoreService, NotificationService } from 'src/app/shared';
import { Product } from '../shared';


@Component({
    selector: "products-product",
    template: `
    <div class="product_card" [routerLink] = "['/product', product?._id]" >
    <img src='http://localhost:8080{{product?.images[0]}}' alt="product" />
    <div class="product_atr">
        <div class="product_name">{{product?.name | slice:0:16}}  ... </div>
        <div> {{product?.price | currency:"USD":"symbol"}} </div>
    </div>
<button class="cart_btn" (click)= "addToCart($event)">ADD TO CART</button>
        </div>
    `,
    styles: [`
    .product_card {
        background: whitesmoke;
        width: 130px;
    }
    .product_card:hover {
        cursor: pointer;
    }
    .product_atr {
        padding: 10px;
        font-size: 10px;
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
    @Input() product:Product;
    constructor(private cartstoreService: CartStoreService, private notifyService: NotificationService){}

    addToCart(e:any){
        e.stopPropagation();

        const{_id, name, price, images} = this.product;
        this.cartstoreService.addToCart({_id, name, price, image:images[1], quantity:1});

        this.notifyService.showSuccessMessage("Notification", "Added to cart!");
        
    }
}