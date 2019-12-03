import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { ProductsStoreService, CategoriesStoreService } from '../shared';
import {tap } from 'rxjs/operators';

@Component({
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"]
})

export class ProductsComponent implements OnInit {
    products$:Observable<any>;
    searchedProducts$:Observable<any>
    categories$:Observable<any>;
    pageName:string = "Products";
    currentPage:number = 1;
    pages:number = 1;

    constructor(
        private productStoreService: ProductsStoreService,
        private categoriesStoreService:CategoriesStoreService
        ){}
    changePage(pageNumber:number){
        this.getProducts(pageNumber, 10);
    }

    ngOnInit(){
        this.getProducts(1, 10);
        this.getCategories();
        this.getSearchedProducts();
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
    getSearchedProducts(){
       this.searchedProducts$=  this.productStoreService.getSearchedProducts();
    }
    getCategories(){
        this.categories$ = this.categoriesStoreService.getCategories();
    }
    getProductsInCat(name:string){
        this.products$ = this.productStoreService.getProductsByCat(name);
    }
}