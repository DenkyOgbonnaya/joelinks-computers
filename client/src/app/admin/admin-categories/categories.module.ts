import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesForm } from './categories-form/categories-form.component';
import { AdminCategoriesComponent } from './admin-categories.component';
import { EditableCategoriesComponent } from './editable-category.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        CategoriesForm,
        AdminCategoriesComponent,
        EditableCategoriesComponent
    ],
    exports: [
        AdminCategoriesComponent
    ]
})

export class CategoriesModule {

}