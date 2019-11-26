import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService, Product } from '../products/shared';

@Injectable({providedIn: "root"})
export class ProductsStoreService {
    private _products$ = new BehaviorSubject([]);

    constructor(private productService: ProductService){}

    getProducts():Observable<any>{
        this.productService.getProducts()
        .subscribe( data => {
            this._products$.next(data.products);
        })
        return this._products$.asObservable();
    }
    addProduct(product: FormData, cb:any){
        this.productService.addProduct(product)
        .subscribe(
            data => {
                this._products$.next(this._products$.getValue().concat(data.product));
                return cb(null, data.message);
            },
            err => {
                console.log(err);
                return cb(err);
                
            }
        );
    }
    editProduct(productId:string, credentials:any, cb:any){
        this.productService.editProduct(productId, credentials)
        .subscribe(
            data => {
                let updatedProducts = this._products$.getValue().map( (product:Product) => 
                    product._id === productId ? Object.assign({}, product, data.product) : product);
                this._products$.next(updatedProducts);

                return cb(null, data.message);
            },
            err => cb(err)
        )
    }
    deleteProduct(productId:string, cb:any){
        const updatedProducts = this._products$.getValue().filter( (product:Product) => product._id !== productId);
        this._products$.next(updatedProducts);
        
        this.productService.deleteProduct(productId)
        .subscribe(
            data => cb(null, data.message),
            err => cb(err)
        )
    }
}