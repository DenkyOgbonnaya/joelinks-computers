import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
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
        return this.http.get<ICartItem[]>("/api/cart")
        .pipe(catchError(this.handleError))
    }
    addToCart(product:ICartItem):Observable<any> {
        return this.http.post("/api/cart", product, httpOptions)
        .pipe(catchError(this.handleError))
    }
    removeProduct(productId:string){
        return this.http.delete(`/api/cart/${productId}`, httpOptions)
        .pipe(catchError(this.handleError))
    }
    updateQuantity(productId:string, quantity:number){
        return this.http.put(`api/cart/${productId}`, {quantity}, httpOptions)
    }
    checkout(credentials: any, userId:any):Observable<any>{
        return this.http.post(`/api/checkout/${userId}`,credentials, httpOptions )
        .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            //client or network error
            return throwError("Could not complete your checkout, Network error detected.")
        }else {
            //bE error
            if(error.status < 500){
                return throwError(error.error.message);
            }else 
            return throwError("Something went wrong, it's not you it's us. try checkout again");
            
        }
    }
}

