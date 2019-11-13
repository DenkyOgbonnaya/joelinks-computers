import { Component, Input } from "@angular/core";
import { Product } from '../product';

@Component({
    selector: "app-productlist",
    template: `
    <div class="container">
    <div class="row no-gutters">
        <div class="col no-gutters" *ngFor="let product of products">
            <div class="product_card" [routerLink] = "['/product', product._id]" >
                <img src={{product?.image}} alt="product" />
                    <div class="product_atr">
                        <div class="product_name">{{product?.name}}</div>
                        <div>{{product?.attributes.processor}}</div>
                        <div>{{product?.price}}</div>
                    </div>
                <button class="cart_btn">ADD TO CART</button>
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
}