import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class NotificationService {
    constructor(private toastr: ToastrService){}

    showSuccessMessage(tite:string, message:string){
        this.toastr.success(message, tite);
    }
    showErrorMessage(tite:string, message:string){
        this.toastr.error(message, tite);
    }
}