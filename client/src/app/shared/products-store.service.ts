import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService, Product } from '../products/shared';

@Injectable({providedIn: "root"})
export class ProductsStoreService {
    private initialState:any = {
        products: [],
        page: 1,
        pages: 1,
        total: 1
    }
    private _products$ = new BehaviorSubject(this.initialState);
    private _searchedProducts$ = new BehaviorSubject([]);

    constructor(private productService: ProductService){}

    getProducts(page:number, limit:number):Observable<any>{
        this.productService.getProducts(page, limit)
        .subscribe( (data:any) => {
            this._products$.next({
                ...this._products$.getValue(),
                ...data
            });
        })
        return this._products$.asObservable();
    }
    addProduct(product: FormData, cb:any){
        this.productService.addProduct(product)
        .subscribe(
            (data:any) => {
                const updatedProducts = this._products$.getValue().products.concat(data.product);
                this.updateProductsState(updatedProducts);
                return cb(null, data.message);
            },
            (err:any) => {
                console.log(err);
                return cb(err);
                
            }
        );
    }
    editProduct(productId:string, credentials:any, cb:any){
        this.productService.editProduct(productId, credentials)
        .subscribe(
            (data:any) => {
                let updatedProducts = this._products$.getValue().products.map( (product:Product) => 
                    product._id === productId ? Object.assign({}, product, data.product) : product);

               this.updateProductsState(updatedProducts);

                return cb(null, data.message);
            },
            (err:any) => cb(err)
        )
    }
    deleteProduct(productId:string, cb:any){
        const updatedProducts = this._products$.getValue().products.filter( (product:Product) => product._id !== productId);
        this.updateProductsState(updatedProducts);

        this.productService.deleteProduct(productId)
        .subscribe(
            (data:any) => cb(null, data.message),
            (err:any) => cb(err)
        )
    }
    searchProduct(search:string, cb:Function){
        this.productService.searchProduct(search)
        .subscribe( 
            (data:any) => {
            this._searchedProducts$.next(data.products);
            cb(null);
        },
            (err:any) => cb(err)
        );
    }
    getSearchedProducts():Observable<any>{
        return this._searchedProducts$.asObservable();
    }
    getProductsByCat(name:string):Observable<any>{
        this.productService.getProductsByCat(name)
        .subscribe( (data:any) => {
            this._products$.next({
                ...this._products$.getValue(),
                ...data
            });
        })
        return this._products$.asObservable();
    }
    updateProductsState(updatedProducts:any[]){
        const  updatedState = {
            ...this._products$.getValue(),
            products: updatedProducts
        }
        this._products$.next(updatedState);
    }
}