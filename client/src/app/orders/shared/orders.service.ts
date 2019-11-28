import { Injectable } from "@angular/core";
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httOptions = {
    headers: new HttpHeaders({
        "Content-Type": "Application/json",
        "Accept": "application/json"
    })
}

@Injectable({providedIn: "root"})
export class OrderService {
    constructor(private http: HttpClient){}

    getOrders(userId:string):Observable<any> {
        return this.http.get(`/api/users/${userId}/orders`, httOptions);
    }
    getOrder(orderId:string):Observable<any>{
        return this.http.get(`/api/orders/${orderId}`, httOptions);
    }
    getOrdersInStatus(status:string):Observable<any> {
        return this.http.get(`/api/orders/${status}/status`, httOptions);
    }
}