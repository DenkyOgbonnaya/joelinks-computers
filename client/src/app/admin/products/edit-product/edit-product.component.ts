import { Component, OnInit} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { ProductService } from "../../../products/shared"; //'src/app/products/shared';
import {  Observable } from 'rxjs';

@Component({
    template: `
        <div class="edit_container">
            <div *ngIf="(product$ | async)" >
                <h4>Edit product product</h4>
                <products-form [product]="(product$ | async).product"> </products-form>
            </div>
            <div class="spinnar" *ngIf="!(product$ | async)">
                <div class="spinner-border text-danger" role="status">
                    <span class="sr-only">loading...</span>
                </div>
            </div>
        </div>
        `
        ,
    styles: [`
        .edit_container {
            padding: 10px;
        }
        h4 {
            color: crimson;
        }
        .spinnar {
            text-align: center;
        }
    `]
})
export class EditProductComponent implements OnInit {
    product$:Observable<any> | undefined;
    constructor(private route: ActivatedRoute, private productService: ProductService){

    }
    getProduct(){
        const id:string = this.route.snapshot.params['id'];

        this.product$ = this.productService.getProduct(id)
    }

    ngOnInit(){
        this.getProduct();
    }
}