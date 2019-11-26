import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { Product, ProductService } from 'src/app/products/shared';
import { ProductsStoreService, NotificationService } from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
    templateUrl: "./admin-products.component.html",
    styles: [`
        .products_container {
            padding: 10px;
        }
        .spinner {
            text-align: center;
        }
    `]
})
export class AdminProductsComponent implements OnInit {
    products$:Observable<Product[]>

    constructor(
        private productsStoreService:ProductsStoreService,
        private notify: NotificationService,
        private router: Router
    ){}

    getProducts(){
        this.products$ = this.productsStoreService.getProducts();
    }
    handleEdit(event:Event, id:string){
        this.router.navigate([`/admin/product/edit/${id}`]);

        event.stopPropagation();
    }
    deleteProduct(event:Event, id:string){
        event.stopPropagation();
        
        this.productsStoreService.deleteProduct(id, (err:any, message:string) => {
            if(!err){
                this.notify.showSuccessMessage("Succes", message);
            }
        })
    }
    ngOnInit(){
        this.getProducts();
    }
}