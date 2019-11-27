import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "editable-category",
    template: `
        <td class="td" *ngIf="isOpen">
            {{category.name}}
        </td>
        <td class="td" *ngIf="isOpen"> 
            <img src="/assets/icons/edit_ic20px.png" alt="edit" (click)="handleEdit(category.name)" />
        </td>
        <td class="td" *ngIf="isOpen"> 
            <img src="/assets/icons/delete_ic20px.png" alt="delete" (click)="handleDelete(category._id)" /> 
        </td>
        
        <td class="td" #categoriesForm *ngIf="!isOpen">
            <categories-form [category]="category" (close) ="closeForm()"></categories-form>
        </td>
    
    `,
    styles: [`
        .td {
            margin-right: 20px;
        }
    `]
})
export class EditableCategoriesComponent {
    isOpen:boolean = true;
    @Output() deleteCategory = new EventEmitter<string>();
    @Input() category:any;

    handleEdit(name:string){
        this.closeForm();
    }
    handleDelete(categoryId:string){
       this.deleteCategory.emit(categoryId);
    }
    closeForm(){
        this.isOpen = !this.isOpen;
    }
}