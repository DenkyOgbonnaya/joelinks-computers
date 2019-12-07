import { Component } from "@angular/core";
import { ProductsStoreService } from "../../shared" //'src/app/shared';

@Component({
    selector: "products-search",
    template: `<div>
        <br />
        <div class="alert alert-danger" *ngIf="errorMessage">{{errorMessage}}</div>
        <form #searchForm="ngForm" (ngSubmit)=search(searchForm.value) class="form-inline">
            <input type="text" (ngModel)=search name="search" required class="form-control" placeholder="search product..." />
            <button class="btn btn-danger" [disabled] = "!searchForm.valid">
                <span *ngIf="!isLoading">Search</span>
                <div *ngIf="isLoading" class="spinner-border text-light spinner-border-sm" role="status">
                <span class="sr-only">loading...</span>
                </div>
            </button>
        </form>
        
    </div>`
})
export class ProductSerchComponent {
    isLoading:boolean = false;
    errorMessage:any = "";

    constructor(private productsStoreService: ProductsStoreService){}
    search(formValue:any){
        this.isLoading = true;
        this.errorMessage = "";
        this.productsStoreService.searchProduct(formValue.search, (err:any)=> {
            if(err)
                this.errorMessage = err;
            this.isLoading= false;
        })
        
    }
}