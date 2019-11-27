import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

const httOptions = {
    headers: new HttpHeaders({
        "Accept": "application/json"
    })
}
@Injectable()
export class CategoryService {

    constructor(private http: HttpClient){

    }
    getCategories():Observable<any> {
        return this.http.get<any>(`/api/categories`)
    }
    addCategory(category:any):Observable<any>{
        return this.http.post<any>(`/api/categories`, category, httOptions)
        .pipe(catchError(this.handleError))

    }
    editCategory(categoryId:string, credentials:any):Observable<any>{
        return this.http.put<any>(`/api/categories/${categoryId}`, credentials, httOptions)
        .pipe(catchError(this.handleError));
    }
    deleteCategory(categoryId:string):Observable<any>{
        return this.http.delete<any>(`/api/categories/${categoryId}`, httOptions)
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

