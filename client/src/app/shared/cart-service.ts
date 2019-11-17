import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { ICartItem } from '../interfaces/cart-item';

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

    private handleError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            //client or network error
            console.log("error", error.error.message);
        }else {
            //bE error
            console.error(error.status, error.error);
            
        }
        //return a friendly observable error
        return throwError("an error occoured")
    }
}

