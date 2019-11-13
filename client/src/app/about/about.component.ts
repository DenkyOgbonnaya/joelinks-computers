import { Component } from "@angular/core";

@Component({
    selector: "app-about",
    template: `
    <div class=" container about_us">
    <div class="about_us_image">
        <img src="assets/images/joelinks.jpg" alt="ad photo"/>
        <div></div>
    </div>
    <div class="about">
        <h5>The JoeLinks</h5>
        <h3>ABOUT US</h3>
        <p>As a computer sales and Servicing company, we pride our self in sales of all manner</p>
        <ul class="ul">
            <li class="li">Best ee computers</li>
            <li class="li">Best recomputers</li>
            <li class="li">Bestvgg computers</li>
            
        </ul>
        <button class="btn btn-danger btn-sm" [routerLink]= "['/about']">Learn More</button>
    </div>
</div>
    `,
    styles: [`
    .about_us {
        max-width: 690px;
        margin-left: auto;
        margin-right: auto;
    }
    .about_us {
        column-count: 1;
        margin-top: 10px;
        padding: 24px;
    }
    .about_us_image > img {
        position: absolute;
        width: 220px;
        height: 200px;
    }
    .about_us_image > div {
        border-style: inset;
        margin: 20px;
        border: 3px solid crimson;
        height: 220px;
        width: 230px;
    
    }
    .about {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 24px;
        position: relative;
    }
    ul {
        margin: 0;
        padding: 15px;
        
    }
    li {
        padding: 0;
        margin: 0;
        list-style-image: url("/assets/icons/checkmark_ic15px.png");
    }
    .about > h5 {
        color: crimson;
    }
    .about > h5, .po> h2 {
        font-weight: 300px;
    }
    .about > p {
        text-align: left;
        margin-bottom: 5px;
    }
    @media only screen and (min-width: 65.625em) {
        .about_us {
            column-count: 2;
            column-gap: 20px;
            margin-top: 50px;
        }
    }
    `]
})

export class AboutComponent {

}