import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

const httOptions = {
    headers: new HttpHeaders({
        "Content-type": "application/json",
        "Accept": "application/json"
    })
}

@Injectable({providedIn:"root"})
export class ContactUsService {

    constructor(private http: HttpClient){}

    sendMail(mailData:any):Observable<any> {
        return this.http.post("/api/contact", mailData, httOptions)
    }

}