import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../shared/orders.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: "./order-details.component.html",
    styleUrls: ["./order-details.component.css"]
})

export class OrdersDetailsComponent implements OnInit, OnDestroy {
    order:any;
    orderSub:Subscription;
    constructor(private route: ActivatedRoute, private orderService:OrderService){}

    getOrder(){
        const orderId = this.route.snapshot.params["id"];
        this.orderSub = this.orderService.getOrder(orderId)
        .subscribe(data => {
            this.order = data.order;
        })
        
    }
    getNumOfItems(items:any[]){
        if(!items)
            return 0;
        return items.length;
    }
    getSubTotal(itemPrice:number, itemQuantity:number){
        if(!itemPrice && !itemQuantity)
            return 0;
        return itemPrice*itemQuantity
    }
    getTotalPrice(items:any[], shippingFee:number){
        if(!items)
            return 0;
        return shippingFee + items.reduce( (acc:number, curr:any) => acc+ curr.quantity*curr.price, 0);

    }
    ngOnInit(){
        this.getOrder();
    }
    ngOnDestroy(){
        if(this.orderSub)
            this.orderSub.unsubscribe();
    }
}