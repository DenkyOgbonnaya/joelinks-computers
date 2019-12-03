import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Product} from 'src/app/products/shared';
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
    products$:Observable<Product[]>;
    searchedProducts$:Observable<Product[]>;
    currentPage:number = 1;
    pages:number = 1;

    constructor(
        private productsStoreService:ProductsStoreService,
        private notify: NotificationService,
        private router: Router
    ){}

    changePage(pageNumber:number){
        this.getProducts(pageNumber, 10);
    }
    getProducts(pageNumber:number, limit:number){
        this.products$ = this.productsStoreService.getProducts(pageNumber, limit)
        .pipe(
            tap(data => {
                this.currentPage = data.page;
                this.pages = data.pages;
                
            })
        )
    }
    getSearchedProducts(){
        this.searchedProducts$ = this.productsStoreService.getSearchedProducts();
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
        this.getProducts(1, 10);
        this.getSearchedProducts();
    }
}