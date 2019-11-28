import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/orders/shared/orders.service';

@Component({
    templateUrl: "./admin-orders.component.html",
    styles:[]
})
export class AdminOrdersComponent implements OnInit {
    orders$:Observable<any>

    constructor(private orderService: OrderService){}

    getOrdersInStatus(status:string){
        console.log(status);
        
        this.orders$ =  this.orderService.getOrdersInStatus(status);
    }

    ngOnInit(){
        this.getOrdersInStatus("Pending");
    }
}