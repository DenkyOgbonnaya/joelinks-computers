import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from '../product';

@Injectable()
export class ProductService {
    _productsUrl:string = "/assets/products.json";

    constructor(private http: HttpClient){

    }
    getProducts():Observable<HttpResponse<Product>> {
        return this.http.get<Product>(this._productsUrl, {observe: "response"})
    }
    getProduct(id:string):Observable<HttpResponse<Product>>{
        return this.http.get<Product>(`/api/products/${id}`, {observe: "response"});

    }
}