import { Component } from "@angular/core";

@Component({
    template:`<section> 
        <app-subheader [pageName]='pageName'></app-subheader>
        <h1>Our Services</h1>
        <app-services></app-services>
        <app-clients></app-clients>
        <app-about></app-about>
    </section>`,
    styles: [`
        h1 {
            text-align: center;
        }
    `]
})

export class ServicePageComponent {
    pageName:string="Services"
}