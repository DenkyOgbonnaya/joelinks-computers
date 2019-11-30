import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: "order-list",
    template: `
        <div class="order_container container">
            <h4>Your Orders</h4>
            <div *ngIf="orders.orders.length === 0 else orderlist" class="jumbotron" style="text-align: center;">You have no available order</div>
            <div #orderlist class="order_card" *ngFor="let order of orders?.orders">
                <div class="card" (click)="toOrderDetails(order?._id)" >
                    <img src="http://localhost:8080{{order?.items[0].image}}" alt="product"/>
                    <div class="order_details">
                        <div class="order_id">{{order?.items[0].name}} {{isOtherItems(order.items)}}</div>
                        <div class="order_info">
                            <small class="order_created">Ordered on: {{order?.createdAt | date }}</small>
                            <small class="order_status">Status: {{order?.status}}</small>
                        </div>
                    </div>
                        
                    
                </div>
            </div>
        </div>`,
    styles: [`
        .card {
            display: flex;
            flex-direction: row;
            padding: 10px;
            margin-bottom:5px;
        }
        .order_details {
            display: flex;
            flex-direction: column;
        }
        img {
            display: block;
            width: 60px;
            height: 60px;
            margin-right: 10px;
        }
        .card:hover {
            cursor:pointer;
        }
        .order_info {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 5px;
        }
        .order_id {
            font-weight: bold;
        }
        h4 {
            margin-top: 20px;
            color: crimson
        }
    `]
})

export class orderListComponent {
    @Input() orders:any[];
    constructor(private router: Router){}

    isOtherItems(items:any[]){
        if(!items || items.length-1 === 0)
            return "";
        return `plus ${items.length-1} others`;
    }
    toOrderDetails(orderId:string){
        this.router.navigate([`/user/order/${orderId}`]);
    }
}