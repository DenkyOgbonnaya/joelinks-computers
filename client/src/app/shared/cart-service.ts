import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable} from 'rxjs';
import { ICartItem } from '../shopping-cart/shared/cart-item';

const httpOptions = {
    headers: new HttpHeaders({
        "Content-type": "application/json",
        "Accept": "application/json"
    })
}

@Injectable({providedIn: "root"})
export class CartService {
    constructor(private http: HttpClient){}

    getCart():Observable<ICartItem[]> {
        return this.http.get<ICartItem[]>("/api/cart");
    }
    addToCart(product:ICartItem):Observable<any> {
        return this.http.post("/api/cart", product, httpOptions);
    }
    removeProduct(productId:string){
        return this.http.delete(`/api/cart/${productId}`, httpOptions);
    }
    updateQuantity(productId:string, quantity:number){
        return this.http.put(`api/cart/${productId}`, {quantity}, httpOptions)
    }
    checkout(credentials: any, userId:any):Observable<any>{
        return this.http.post(`/api/checkout/${userId}`,credentials, httpOptions );
    }

}

