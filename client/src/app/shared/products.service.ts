import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from '../product';

@Injectable()
export class ProductService {
    _productsUrl:string = "/api/products";

    constructor(private http: HttpClient){

    }
    getProducts():Observable<HttpResponse<any>> {
        return this.http.get<any>(this._productsUrl, {observe: "response"})
    }
    getProduct(id:string):Observable<HttpResponse<any>>{
        return this.http.get<any>(`/api/products/${id}`, {observe: "response"});

    }
    getHomeProducts():Observable<HttpResponse<any>>{
        return this.http.get<any>("/assets/products.json", {observe: "response"});
    }
    getSimilarProducts():Observable<HttpResponse<any>>{
        return this.http.get<any>("/assets/similar-products.json", {observe: "response"});
    }
}