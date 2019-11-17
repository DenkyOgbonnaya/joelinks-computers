import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from '../shared/products.service';
import { Product } from '../product';
import { CartStoreService } from '../shared/cart-store.service';
import { NotificationService } from '../shared/notification.service';

@Component({
    templateUrl: "./product-details.component.html",
    styleUrls: ["./product-details.component.css"]
})

export class ProductDetailsComponent {
    pageName:string = "Products Details";
    product:Product;
    similarProducts:Product[] = [];
    quantity:number = 1;

    constructor(
        private route: ActivatedRoute, 
        private productService: ProductService,
        private cartstoreService: CartStoreService,
        private notifyService: NotificationService
    ){}

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
    addQuantity():void{
        this.quantity+=1;
    }
    subtractQuantity():void{
        if(this.quantity>1)
            this.quantity-=1;
    }
    addToCart(product:Product){
        const{_id, name, price, images} = product;
        this.cartstoreService.addToCart({_id, name, price, image:images[1], quantity: this.quantity});

        this.notifyService.showSuccessMessage("Notification", "Added to cart!");
    }
}

