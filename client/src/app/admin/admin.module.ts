import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HeaderModule } from '../header/header.module';
import { AdminProductsComponent } from './products/admin-products.component';
import { RouterModule} from '@angular/router';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductFormComponent } from './products/products-form/products-form.component';
import { PaginationModule } from '../pagination/pagination.module';
import { ProductsModule } from '../products';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminOrderlistComponent } from './admin-orders/admin-orders-list/admin-orders-list.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        HeaderModule,
        RouterModule,
        ReactiveFormsModule,
        PaginationModule,
        ProductsModule,
        RouterModule
        
    ],
    declarations: [
        AdminDashboardComponent,
        ProductFormComponent,
        AdminProductsComponent,
        AddProductComponent,
        EditProductComponent,
        AdminOrdersComponent,
        AdminOrderlistComponent
    ]
})
export class AdminModule {

}