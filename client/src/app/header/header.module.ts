import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from './header.component';
import { SubHeader } from './sub-header/subheader.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent,
        SubHeader
    ],
    exports: [
        HeaderComponent,
        SubHeader
    ]
})
export class HeaderModule {

}