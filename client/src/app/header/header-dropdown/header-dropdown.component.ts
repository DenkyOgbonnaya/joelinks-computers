import {Component, Input} from '@angular/core';

@Component({
  selector: 'header-dropdown',
  templateUrl: './header-dropdown.component.html'
})
export class HeaderDropdownComponent {
    @Input()currentUser:any;
}