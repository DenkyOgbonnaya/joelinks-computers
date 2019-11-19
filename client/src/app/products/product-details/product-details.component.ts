import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService, Product } from '../shared';
import { CartStoreService, NotificationService } from 'src/app/shared';
import { Observable, Subscription } from 'rxjs';

@Component({
    templateUrl: "./product-details.component.html",
    styleUrls: ["./product-details.component.css"]
})

export class ProductDetailsComponent implements OnInit, OnDestroy {
    pageName:string = "Products Details";
    product:Product;
    similarProducts$:Observable<Product[]>;
    quantity:number = 1;
    productSub: Subscription;
    routeSub:Subscription;

    constructor(
        private route: ActivatedRoute, 
        private productService: ProductService,
        private cartstoreService: CartStoreService,
        private notifyService: NotificationService
    ){
        this.routeSub = route.params.subscribe(val => {
            this.getProduct();
        })
    }

    ngOnInit(){
        this.getProduct();
        this.getSimilarProducts();
    }
    getProduct(){
        const productId:string = this.route.snapshot.params["id"];
        this.productSub = this.productService.getProduct(productId)
        .subscribe( data => this.product = data)
    }
    getSimilarProducts(){
        this.similarProducts$ = this.productService.getSimilarProducts();
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
    ngOnDestroy(){
        this.productSub.unsubscribe();
        this.routeSub.unsubscribe();
    }
}

