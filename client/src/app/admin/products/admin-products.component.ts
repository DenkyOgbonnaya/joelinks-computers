import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Product} from "../../products/shared" //'src/app/products/shared';
import { ProductsStoreService} from "../../shared"; //'src/app/shared';

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
    products$:Observable<any> | undefined;
    searchedProducts$:Observable<Product[]> | undefined;
    currentPage:number = 1;
    pages:number = 1;

    constructor(
        private productsStoreService:ProductsStoreService
    ){}

    changePage(pageNumber:number){
        this.getProducts(pageNumber, 10);
    }
    getProducts(pageNumber:number, limit:number){
        this.products$ = this.productsStoreService.getProducts(pageNumber, limit)
        .pipe(
            tap( (data:any) => {
                this.currentPage = data.page;
                this.pages = data.pages;
                
            })
        )
    }
    getSearchedProducts(){
        this.searchedProducts$ = this.productsStoreService.getSearchedProducts();
    }
    
    ngOnInit(){
        this.getProducts(1, 10);
        this.getSearchedProducts();
    }
}