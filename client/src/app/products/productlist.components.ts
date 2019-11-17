import { Component, Input } from "@angular/core";
import { Product } from '../product';
import { CartStoreService } from '../shared/cart-store.service';
import { NotificationService } from '../shared/notification.service';

@Component({
    selector: "app-productlist",
    template: `
    <div class="container">
    <div class="row no-gutters">
        <div class="col no-gutters" *ngFor="let product of products">
            <div class="product_card" [routerLink] = "['/product', product._id]" >
                <img src='http://localhost:8080{{product?.images[0]}}' alt="product" />
                    <div class="product_atr">
                        <div class="product_name">{{product?.name | slice:0:16}} ... </div>
                        <div>{{product?.price | currency:"USD":"symbol"}}</div>
                    </div>
                <button class="cart_btn" (click)= "addToCart($event, product)">ADD TO CART</button>
                </div>
            </div>
        </div>
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
    .col {
        margin-bottom: 5px;
        column-gap: 5px;
    }
    .product_name {
        font-weight: bold;
    }
    .cart_btn {
        width: 100%;
        font-size: 10px;
        border-color: #ccc;
    }
    @media only screen and (min-width: 65.625em) {
        .container {
            width: 800px;
            margin: auto;
        }
    }
    `]
})

export class productlistComponent {
    @Input() products:Product[];

    constructor(private cartstoreService: CartStoreService, private notifyService: NotificationService){}

    addToCart(e:any, product:Product){
        e.stopPropagation();

        const{_id, name, price, images} = product;
        this.cartstoreService.addToCart({_id, name, price, image:images[1], quantity:1});

        this.notifyService.showSuccessMessage("Notification", "Added to cart!");
        
    }
}