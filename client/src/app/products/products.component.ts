import { Component, OnInit } from "@angular/core";
import { Product } from '../product';
import { ProductService } from '../shared/products.service';

@Component({
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"]
})

export class ProductsComponent {
    products:Product;
    pageName:string = "Products";

    constructor(private productService: ProductService){}

    ngOnInit(){
        this.getProducts();
    }
    getProducts(){
        this.productService.getProducts().subscribe( res => {
            
            
            if(res.status === 200){
                this.products = res.body.products;
            }
            console.log(this.products.price);
            
        })
    }
}