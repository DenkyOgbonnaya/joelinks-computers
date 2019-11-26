import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { ProductsStoreService } from '../shared';

@Component({
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"]
})

export class ProductsComponent implements OnInit {
    products$:Observable<any>;
    pageName:string = "Products";

    constructor(private productStoreService: ProductsStoreService){}

    ngOnInit(){
        this.getProducts();
    }
    getProducts(){
        this.products$ = this.productStoreService.getProducts()
    }
}