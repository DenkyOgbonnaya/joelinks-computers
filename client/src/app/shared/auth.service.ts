import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs';
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
        return this.http.post<any>("/api/users/login", user, httOptions);
    }
    signup(user:any):Observable<any>{
        return this.http.post<any>("/api/users/signup", user, httOptions);
    }
    setCurrentUser(authToken: string){
        localStorage.authToken = authToken;
        const decoded:any = jwt_decode(authToken);
        this._currentUser$.next(decoded.currentUser);
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
        return this.http.get<any>(`/api/users/verify/${token}`);
    }
    isCurrentUser(){
        return this._currentUser$.getValue();
    }
    getUsers(pageNumber:number, limit:number):Observable<any>{
        return this.http.get(`/api/users?page=${pageNumber}&limit=${limit}`, httOptions);
    }
    getUser(userId:string):Observable<any>{
        return this.http.get(`/api/users/${userId}`, httOptions);
    }
    saveProfile(userId:string, data:any):Observable<any> {
        return this.http.post<any>(`/api/users/${userId}`, data, httOptions);
    }
    makeAdmin(userId:string){
        return this.http.post<any>(`/api/users/${userId}/makeadmin`, httOptions);
    }
    disAdmin(userId:string){
        return this.http.post<any>(`/api/users/${userId}/disadmin`, httOptions);
    }
    
}