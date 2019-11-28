import { Component, Input } from "@angular/core";

@Component({
    selector: "admin-orderlist",
    templateUrl: "./admin-orders-list.component.html",
    styles: [`
        th {
            color: crimson;
        }
    `]
})
export class AdminOrderlistComponent {
    @Input() orders:any[] = [];

    getTotalPrice(items:any[], shippingFee:number){
        if(!items)
            return 0;
        return shippingFee + items.reduce( (acc:number, curr:any) => acc+ curr.quantity*curr.price, 0);

    }
}