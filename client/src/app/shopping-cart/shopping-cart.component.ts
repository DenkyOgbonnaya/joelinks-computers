import { Component } from "@angular/core";

@Component({
    templateUrl: "./shopping-cart.component.html",
    styleUrls: ["./shopping-cart.component.css"]
})

export class ShoppingCartComponent {
    pageName:string = "Shopping Cart";
    cartProducts:any = [1,2,3,4,4,3,4,4];
}