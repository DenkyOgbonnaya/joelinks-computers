import { Component, Input, OnDestroy } from "@angular/core";
import { OrderService } from "../../../orders/shared/orders.service"; //'src/app/orders/shared/orders.service';
import { NotificationService } from "../../../shared"//'src/app/shared';
import { Subscription } from 'rxjs';

@Component({
    selector: "admin-orderlist",
    templateUrl: "./admin-orders-list.component.html",
    styles: [`
        th {
            color: crimson;
        }
    `]
})
export class AdminOrderlistComponent implements OnDestroy {
    @Input() orders:any[] = [];
    orderSub: Subscription | undefined;
    constructor(private orderService:OrderService, private notify: NotificationService){}

    getTotalPrice(items:any[], shippingFee:number){
        if(!items)
            return 0;
        return shippingFee + items.reduce( (acc:number, curr:any) => acc+ curr.quantity*curr.price, 0);

    }
    updateStatus(event:any, orderId:string){
        event.stopPropagation();
        const status = event.target.value;

        this.orderSub = this.orderService.updateOrder(orderId, status)
        .subscribe(
            (data:any) => {
                this.notify.showSuccessMessage("Success", data.message);
                this.orders = this.orders.map( order => order._id == orderId ? Object.assign({}, order, data.order): order)
            },
            (err:any) => this.notify.showErrorMessage("Failed", err)
        )
        
    }
    ngOnDestroy(){
        if(this.orderSub)
            this.orderSub.unsubscribe();
    }
}