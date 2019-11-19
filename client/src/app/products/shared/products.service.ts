import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from './product.model';

@Injectable()
export class ProductService {
    _productsUrl:string = "/api/products";

    constructor(private http: HttpClient){

    }
    getProducts():Observable<Product[]> {
        return this.http.get<Product[]>(this._productsUrl)
    }
    getProduct(id:string):Observable<Product>{
        return this.http.get<Product>(`/api/products/${id}`);

    }
    getHomeProducts():Observable<Product[]>{
        return this.http.get<Product[]>("/assets/products.json");
    }
    getSimilarProducts():Observable<Product[]>{
        return this.http.get<Product[]>("/assets/similar-products.json");
    }
}