import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { ProductsStoreService } from '../shared';
import { take, tap } from 'rxjs/operators';

@Component({
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"]
})

export class ProductsComponent implements OnInit {
    products$:Observable<any>;
    pageName:string = "Products";
    currentPage:number = 1;
    pages:number = 1;

    constructor(private productStoreService: ProductsStoreService){}
    changePage(pageNumber:number){
        this.getProducts(pageNumber, 10);
    }

    ngOnInit(){
        this.getProducts(1, 10);
    }
    getProducts(pageNumber:number, limit:number){
        this.products$ = this.productStoreService.getProducts(pageNumber, limit)
        .pipe(
            tap(data => {
                this.currentPage = data.page;
                this.pages = data.pages;
                
            })
        )
    }
}