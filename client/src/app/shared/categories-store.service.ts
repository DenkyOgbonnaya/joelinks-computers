import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryService } from '../admin/admin-categories/shared/categories.service';

@Injectable({providedIn: "root"})
export class CategoriesStoreService {
    private initialState:Array<any> = []
    private _categories$ = new BehaviorSubject(this.initialState);

    constructor(private categoryService:CategoryService){}

    getCategories():Observable<any>{
        this.categoryService.getCategories()
        .subscribe( (data:any) => {
            this._categories$.next(data.categories);
        })
        return this._categories$.asObservable();
    }
    addCategory( category:any, cb:any){
        this.categoryService.addCategory(category)
        .subscribe(
            (data:any) => {
                this._categories$.next(this._categories$.getValue().concat(data.category))
                return cb(null, data.message);
            },
            (err:any) => {
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
            (data:any) => {
                return cb(null, data.message);
            },
            (err:any) => cb(err)
        )
    }
    deleteCategory(categoryId:string, cb:any){
        const updatedCategories = this._categories$.getValue().filter( (category:any) => category._id !== categoryId);
        this._categories$.next(updatedCategories);

        this.categoryService.deleteCategory(categoryId)
        .subscribe(
            (data:any) => cb(null, data.message),
            (err:any) => cb(err)
        )
    }
}