import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";

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
    addProduct(product: FormData):Observable<any>{
        return this.http.post<any>(`/api/products`, product, httOptions);

    }
    editProduct(productId:string, credentials:any):Observable<any>{
        return this.http.put<any>(`/api/products/${productId}`, credentials, httOptions);
    }
    deleteProduct(productId:string):Observable<any>{
        return this.http.delete<any>(`/api/products/${productId}`, httOptions);
    }
    searchProduct(search:string):Observable<any>{
        return this.http.get<any>(`/api/product/search?search=${search}`);
    }
    getProductsByCat(name:string):Observable<any> {
        return this.http.get<any>(`/api/product/category/${name}`)
    }
    deleteProductImage(productId:any, imageId:any):Observable<any>{
        return this.http.delete<any>(`/api/product/${productId}/deleteImage?imageId=${imageId}`, httOptions);
    }
}

