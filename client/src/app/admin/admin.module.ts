import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";


import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HeaderModule } from '../header/header.module';
import { AdminProductsComponent } from './products/admin-products.component';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductFormComponent } from './products/products-form/products-form.component';

@NgModule({
    imports: [
        CommonModule,
        HeaderModule,
        RouterModule,
        ReactiveFormsModule
    ],
    declarations: [
        AdminDashboardComponent,
        ProductFormComponent,
        AdminProductsComponent,
        AddProductComponent,
        EditProductComponent
    ]
})
export class AdminModule {

}