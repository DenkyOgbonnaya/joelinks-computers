import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import { NotificationService, CategoriesStoreService } from "../../../shared"//'src/app/shared';

@Component({
    selector: "categories-form",
    template: `
        <div>
            <div class="alert alert-danger"*ngIf="errorMessage"> {{errorMessage}}</div>
            <form class="form-inline" #categoriesForm ="ngForm"  (ngSubmit)="handleSubmit(categoriesForm.value)">
                <input type="text" [(ngModel)]="name" name="name" required class="form-control" placeholder="category name..." />
                <button class="btn btn-danger" [disabled]= "!categoriesForm.valid" >
                    <span *ngIf="!isLoading">{{category ? "Save" : "Add"}}</span>
                    <div *ngIf="isLoading" class="spinner-border text-light spinner-border-sm" role="status">
                        <span class="sr-only">loading...</span>
                    </div>
                </button>
                <span class="close_btn" *ngIf="category" (click)="handleClose()">X </span>
            </form>
        </div>
    `,
    styles: [`
        .close_btn {
            margin-left: 20px;
        }
        .close_btn:hover {
            color:red;
        }
    `]
})
export class CategoriesForm implements OnInit {
    name:string = "";
    isLoading:boolean = false;
    errorMessage:string = "";
    @Input() category:any | undefined;
    @Output() close =  new EventEmitter<boolean>();

    constructor(private categoriesStoreService: CategoriesStoreService, private notifyService: NotificationService){}

    handleClose(){
        this.close.emit(true);
    }

    handleSubmit(formValue:any){
        this.isLoading = true;
        this.errorMessage = "";

        if(!this.category){
            this.categoriesStoreService.addCategory(formValue, (err:any, message:string)=>{
                if(err){
                    console.log(err);
                    this.errorMessage = err;
                    
                }else {
                    this.notifyService.showSuccessMessage("success", message)
                }
            })
        }else {
            this.categoriesStoreService.editCategory(this.category._id, formValue, (err:any, message:string)=>{
                if(err){
                    console.log(err);
                    this.errorMessage = err;
                    
                }else {
                    this.notifyService.showSuccessMessage("success", message)
                    this.handleClose();
                }
            })
            
        }
        this.isLoading = false;
    }

    ngOnInit(){
        if(this.category)
            this.name = this.category.name;
        
    }
}