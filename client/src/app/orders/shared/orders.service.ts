import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { catchError } from 'rxjs/operators';

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
        return this.http.get(`/api/users/${userId}/orders`, httOptions)
        .pipe(catchError(this.handleError))
    }
    getOrder(orderId:string):Observable<any>{
        return this.http.get(`/api/orders/${orderId}`, httOptions)
        .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            //client or network error
            return throwError("Could not complete your login, Network error detected.")
        }else {
            //bE error
            if(error.status < 500){
                return throwError(error.error.message);
            }else 
            return throwError("Something went wrong, it's not you it's us. try login again");
            
        }
    }
}