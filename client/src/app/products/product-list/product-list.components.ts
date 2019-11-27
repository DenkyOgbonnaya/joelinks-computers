import { Component, Input } from "@angular/core";
import { Product } from '../shared/product.model';

@Component({
    selector: "products-list",
    template: `
    <div class="container">
    <div class="spinner">
        <div  class="spinner-border text-danger" *ngIf="!products">
            <span class="sr-only">loading..</span>
        </div>
    </div>
    <div class="jumbotron"  *ngIf="products && products.length === 0">
        <img src="/assets/icons/product_ic20px.png" alt="no products" />
         <span>No Products </span>
    </div>
    <div class="row no-gutters" *ngIf="products && products.length > 0">
        <div class="col no-gutters" *ngFor="let product of products">
            <products-product [product] = product></products-product>
        </div>
    </div>
    `,
    styles: [`
    .col {
        margin-bottom: 5px;
        column-gap: 5px;
    }
    .spinner {
        text-align: center;
    }
    .jumbotron {
        text-align: center;
        
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