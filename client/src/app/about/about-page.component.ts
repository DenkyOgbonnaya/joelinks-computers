import { Component, Input } from "@angular/core";

@Component({
    template: `<div>
        <app-subheader [pageName]="pageName"></app-subheader>
        <app-about></app-about>
        <app-team></app-team>
        <h4> What you get from us? </h4>
        <h1 class="service_label"> Our Services </h1>
        <app-services></app-services>
        <app-clients></app-clients>
     </div>`,
    styles: [`
       
        h1, h4 {
            text-align: center;
            color: #ffffff;
        }
        h4 {
            color: crimson;
            margin-top: 20px;
        }
        .service_label {
            color: #212121;
        }
    `]
})

export class AboutPageComponent {
    @Input() pageName: string = 'About';
}