import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrdersComponent } from './orders.component';
import { OrdersDetailsComponent } from './order-details/order-details.component';


@NgModule({
    imports: [CommonModule],
    declarations: [
        OrdersComponent,
        OrdersDetailsComponent
    ]
})
    export class OrdersModule {
}
