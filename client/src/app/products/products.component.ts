import { Component, OnInit } from "@angular/core";
import { Product, ProductService } from './shared';
import { Observable } from 'rxjs';

@Component({
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"]
})

export class ProductsComponent implements OnInit {
    products$:Observable<Product[]>;
    pageName:string = "Products";

    constructor(private productService: ProductService){}

    ngOnInit(){
        this.getProducts();
    }
    getProducts(){
        this.products$ = this.productService.getProducts();
    }
}