import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

const httOptions = {
    headers: new HttpHeaders({
        "Content-Type": "Application/json",
        "Accept": "application/json"
    })
}

@Injectable({providedIn: "root"})
export class AuthService {
    currentUser = null;
    constructor(private http: HttpClient){}
    login(username:string, password:string):Observable<any>{
        return this.http.post("/api/users/login", {username, password}, httOptions)
        .pipe(catchError(this.handleError))
    }
    signup(username:string, email:string, password:string){
        return this.http.post("/api/users/signup", {username, password, email}, httOptions)
        .pipe(catchError(this.handleError));
    }
    setCurrentUser(authToken: string){
        
    }
    private handleError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            //client or network error
            console.log("error", error.error.message);
        }else {
            //bE error
            console.error(error.status, error.error);
            
        }
        //return a friendly observable error
        return throwError("an error occ")
    }
}