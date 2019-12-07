import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { NotificationService, CategoriesStoreService } from "../../shared" //'src/app/shared';

@Component({
    template: `
        <div class="container">
            <br />
            <h4>Categories</h4>
            <categories-form [category]=null></categories-form>
            <br />
            <div class="table-responsive">
                <table class="table ">
                    <thead>
                        <tr> <th>Name</th> </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let category of categories | async ">
                            <editable-category [category]=category (deleteCategory)="handleDelete($event)"> </editable-category> 
                        </tr>
                    </tbody>
                </table>
            
            </div>
        </div>
    `
})
export class AdminCategoriesComponent implements OnInit {
    categories:Observable<any> | undefined;
    constructor(
        private categoriesStoreService: CategoriesStoreService,
        private notifyService:NotificationService
        ){}

    getCategories(){
        this.categories = this.categoriesStoreService.getCategories();
    }
    handleDelete(id:string){
        this.categoriesStoreService.deleteCategory(id, (err:any, message:string)=> {
            if(!err){
                this.notifyService.showSuccessMessage("Success", message);
            }
        })
    }
    ngOnInit(){
        this.getCategories();
    }
}