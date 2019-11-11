import { Component } from "@angular/core";

@Component({
    template: `<div>
        <section> 
            <h1>About</h1>
            <p>Joelinks computers </p>
        </section>
        <app-about></app-about>
        <app-team></app-team>
        <h4> What you get from us? </h4>
        <h1 class="service_label"> Our Services </h1>
        <app-services></app-services>
        <app-clients></app-clients>
     </div>`,
    styles: [`
        section {
            display: block;
            background-image: url("/assets/images/joee.jpg");
            background-repeat: no-repeat;
            height: 100px;
        }
        h1, p, h4 {
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

}