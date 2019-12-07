import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { OrderService } from "../../orders/shared/orders.service"; //'src/app/orders/shared/orders.service';

@Component({
    templateUrl: "./admin-orders.component.html",
    styles:[]
})
export class AdminOrdersComponent implements OnInit {
    orders$:Observable<any> | undefined;

    constructor(private orderService: OrderService){}

    getOrdersInStatus(status:string){
        this.orders$ =  this.orderService.getOrdersInStatus(status);
    }

    ngOnInit(){
        this.getOrdersInStatus("Pending");
    }
}