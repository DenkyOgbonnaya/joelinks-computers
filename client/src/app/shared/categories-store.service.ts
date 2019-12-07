import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryService } from '../admin/admin-categories/shared/categories.service';

@Injectable({providedIn: "root"})
export class CategoriesStoreService {
    
    private _categories$ = new BehaviorSubject([]);

    constructor(private categoryService:CategoryService){}

    getCategories():Observable<any>{
        this.categoryService.getCategories()
        .subscribe( data => {
            this._categories$.next(data.categories);
        })
        return this._categories$.asObservable();
    }
    addCategory(category:any, cb:any){
        this.categoryService.addCategory(category)
        .subscribe(
            data => {
                this._categories$.next(this._categories$.getValue().concat(data.category))
                return cb(null, data.message);
            },
            err => {
                console.log(err);
                return cb(err);
                
            }
        );
    }
    editCategory(categoryId:string, credentials:any, cb:any){
        let categories = this._categories$.getValue().map( (category:any) => category._id === categoryId ? 
            Object.assign({}, category, credentials) : category);

        this._categories$.next(categories);
        this.categoryService.editCategory(categoryId, credentials)
        .subscribe(
            data => {
                return cb(null, data.message);
            },
            err => cb(err)
        )
    }
    deleteCategory(categoryId:string, cb:any){
        const updatedCategories = this._categories$.getValue().filter( (category:any) => category._id !== categoryId);
        this._categories$.next(updatedCategories);

        this.categoryService.deleteCategory(categoryId)
        .subscribe(
            data => cb(null, data.message),
            err => cb(err)
        )
    }
}