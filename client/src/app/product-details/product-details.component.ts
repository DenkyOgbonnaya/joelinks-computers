import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from '../shared/products.service';
import { Product } from '../product';

@Component({
    templateUrl: "./product-details.component.html",
    styleUrls: ["./product-details.component.css"]
})

export class ProductDetailsComponent {
    pageName:string = "Products Details";
    product:Product;
    similarProducts:Product[] = []
    constructor(private route: ActivatedRoute, private productService: ProductService){}

    ngOnInit(){
        this.getProduct();
        this.getSimilarProducts();
    }
    getProduct(){
        const productId:string = this.route.snapshot.params["id"];
        this.productService.getProduct(productId).subscribe(res => {
            console.log(res.body.product);
            
            this.product = res.body.product;
        })
    }
    getSimilarProducts(){
        this.productService.getSimilarProducts().subscribe(res => {
            this.similarProducts = res.body;
        })
    }

}

