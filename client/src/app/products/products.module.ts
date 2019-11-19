import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsComponent } from './products.component';
import { productlistComponent } from './product-list/product-list.components';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';
import { HeaderModule } from '../header/header.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HeaderModule
    ],
    declarations: [
        ProductsComponent,
        productlistComponent,
        ProductDetailsComponent,
        ProductComponent
    ],
    exports: [
        productlistComponent,
        ProductDetailsComponent,
        ProductsComponent
    ]
})
export class ProductsModule {

}