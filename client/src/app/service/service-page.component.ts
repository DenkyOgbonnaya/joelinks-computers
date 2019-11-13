import { Component } from "@angular/core";

@Component({
    template:`<section> 
        <app-subheader [pageName]='pageName'></app-subheader>
        <h2>Our Services</h2>
        <app-services></app-services>
        <app-clients></app-clients>
        <app-about></app-about>
    </section>`,
    styles: [`
        h2 {
            text-align: center;
        }
    `]
})

export class ServicePageComponent {
    pageName:string="Services"
}