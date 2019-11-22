import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrdersComponent } from './orders.component';
import { OrdersDetailsComponent } from './order-details/order-details.component';
import { orderListComponent } from "./order-list/order-list.component";


@NgModule({
    imports: [CommonModule],
    declarations: [
        OrdersComponent,
        orderListComponent,
        OrdersDetailsComponent
    ]
})
    export class OrdersModule {
}
