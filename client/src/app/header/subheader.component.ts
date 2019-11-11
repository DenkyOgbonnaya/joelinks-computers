import { Component, Input } from "@angular/core";

@Component({
    selector: "app-subheader",
    template: `<section> 
        <h1>{{pageName}}</h1>
        <p>Joelinks computers </p>
    </section>`,
    styles: [`
        section {
            display: block;
            background-image: url("/assets/images/joee.jpg");
            background-repeat: no-repeat;
            height: 100px;
        }
        h1, p {
            color: #ffffff;
            text-align: center;
        }
        
    `]
})
export class SubHeader {
@Input() pageName:string = '';
}