import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Product } from './product.model';

const httOptions = {
    headers: new HttpHeaders({
        "Accept": "application/json"
    })
}
@Injectable()
export class ProductService {
    _productsUrl:string = "/api/products";

    constructor(private http: HttpClient){

    }
    getProducts(page:number, limit:number):Observable<any> {
        return this.http.get<any>(`/api/products?page=${page}&limit=${limit}`)
    }
    getProduct(id:string):Observable<any>{
        return this.http.get<any>(`/api/products/${id}`);

    }
    getHomeProducts():Observable<Product[]>{
        return this.http.get<Product[]>("/assets/products.json");
    }
    getSimilarProducts():Observable<Product[]>{
        return this.http.get<Product[]>("/assets/similar-products.json");
    }
    addProduct(product: FormData):Observable<any>{
        return this.http.post<any>(`/api/products`, product, httOptions)
        .pipe(catchError(this.handleError))

    }
    editProduct(productId:string, credentials:any):Observable<any>{
        return this.http.put<any>(`/api/products/${productId}`, credentials, httOptions)
        .pipe(catchError(this.handleError));
    }
    deleteProduct(productId:string):Observable<any>{
        return this.http.delete<any>(`/api/products/${productId}`, httOptions)
        .pipe(catchError(this.handleError));
    }
    searchProduct(search:string):Observable<any>{
        return this.http.get<any>(`/api/product/search?search=${search}`)
        .pipe(catchError(this.handleError));
    }
    private handleError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            //client or network error
            return throwError("Could not complete your request, Network error detected.")
        }else {
            //bE error
            if(error.status < 500){
                return throwError(error.error.message);
            }else 
            return throwError("Something went wrong, it's not you it's us. try again");
            
        }
    }
}

