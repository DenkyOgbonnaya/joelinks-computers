import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ProductsStoreService, NotificationService } from "../../shared";

@Component({
    selector: "admin-productslist",
    template: `<div class="table-responsive" *ngIf="products">
    <table class="table w-100 table-hover">
    <thead>
        <tr>
            <th>Name</th>
            <th>price</th>
            <th>Quantity</th>
            <th>Brand</th>
            <th>Category</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let product of products" [routerLink]= "['/product', product?._id]" >
            <td>{{product?.name}}</td>
            <td>{{product?.price | currency: "N"}}</td>
            <td>{{product?.quantity}}</td>
            <td>{{product?.brand}}</td>
            <td>{{product?.category}}</td>
            <td> <button class="btn btn-light" (click)="handleEdit($event, product._id)">Edit</button> </td>
            <td> <button class="btn btn-danger btn-sm" data-toggle="tooltip" title="disabled" (click)="deleteProduct($event, product._id)" disabled>Delete </button> </td>
        </tr>
    </tbody>
</table>
    </div>
    <div *ngIf="products.length === 0" class="jumbotron"> No Products!</div>
    `
})
export class AdminProductslistComponent {
    @Input() products:any = [];
    constructor(private router:Router, private productsStoreService:ProductsStoreService, private notify:NotificationService){}

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
}