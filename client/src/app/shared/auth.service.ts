import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from "rxjs/operators";
import * as jwt_decode  from "jwt-decode";
import {Router } from '@angular/router';

const httOptions = {
    headers: new HttpHeaders({
        "Content-Type": "Application/json",
        "Accept": "application/json"
    })
}

@Injectable({providedIn: "root"})
export class AuthService {
    private _currentUser$ = new BehaviorSubject(null);

    constructor(private http: HttpClient, private router: Router){}
    login(user:any):Observable<any>{
        return this.http.post<any>("/api/users/login", user, httOptions)
        .pipe(catchError(this.handleError))
    }
    signup(user:any):Observable<any>{
        return this.http.post<any>("/api/users/signup", user, httOptions)
        .pipe(catchError(this.handleError));
    }
    setCurrentUser(authToken: string){
        localStorage.authToken = authToken;
        const decoded = jwt_decode(authToken);
        this._currentUser$.next(decoded.currentUser);
        this.router.navigate(['/home']);
    }
    getCurrentUser():Observable<any>{
        return this._currentUser$.asObservable();
    }
    logout(){
        this._currentUser$.next(null);
        localStorage.removeItem('authToken');
        this.router.navigate(['/home']);
        
    }
    verifyToken(token:string):Observable<any>{
        return this.http.get<any>(`/api/users/verify/${token}`)
        .pipe(catchError(this.handleError));
    }
    isCurrentUser(){
        return this._currentUser$.getValue();
    }
    getUsers(pageNumber:number, limit:number):Observable<any>{
        return this.http.get(`/api/users?page=${pageNumber}&limit=${limit}`, httOptions)
        .pipe(catchError(this.handleError));
    }
    makeAdmin(userId:string){
        return this.http.post<any>(`/api/users/${userId}/makeadmin`, httOptions)
        .pipe(catchError(this.handleError))
    }
    disAdmin(userId:string){
        return this.http.post<any>(`/api/users/${userId}/disadmin`, httOptions)
        .pipe(catchError(this.handleError))
    }
    
    private handleError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            //client or network error
            return throwError("Could not complete your login, Network error detected.")
        }else {
            //bE error
            if(error.status < 500){
                return throwError(error.error.message);
            }else 
            return throwError("Something went wrong, it's not you it's us. try login again");
            
        }
    }
}