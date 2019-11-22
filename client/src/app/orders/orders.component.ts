import { Component, OnInit} from "@angular/core";
import { OrderService } from "./shared/orders.service";
import { Observable} from "rxjs";
import { AuthService } from "../shared";

@Component({
    template: `<div class="contain-fluid">
        <order-list [orders]= "orders$ | async "></order-list>
    </div>`,
    styles: []
})

export class OrdersComponent implements OnInit {
    orders$:Observable<any>;

    constructor(private orderService:OrderService, private authService:AuthService){}
    getOrders(){
        const currentUser:any = this.authService.isCurrentUser();
        if(currentUser){
            this.orders$ = this.orderService.getOrders(currentUser._id);
           
        }
    }
    ngOnInit(){
        this.getOrders();
    }
}