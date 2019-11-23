import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from './header.component';
import { SubHeader } from './sub-header/subheader.component';
import { RouterModule } from '@angular/router';
import { HeaderDropdownComponent } from './header-dropdown/header-dropdown.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule
    ],
    declarations: [
        HeaderComponent,
        SubHeader,
        HeaderDropdownComponent
    ],
    exports: [
        HeaderComponent,
        SubHeader
    ]
})
export class HeaderModule {

}